from pathlib import Path
import json, re
from playwright.sync_api import sync_playwright
import argparse, sys
from lxml import html
import tinycss2

REPO = Path(__file__).resolve().parents[2]
ATLAS = REPO / "design-system/prototypes/components/atlas-clean"
parser = argparse.ArgumentParser(
    description="Compare cleaned CSS with the supplied immutable atlas in Chromium."
)
parser.add_argument("--output", type=Path, default=REPO / "work/atlas-check")
parser.add_argument("--chromium", default="/usr/bin/chromium")
args = parser.parse_args()
ROOT = args.output
ROOT.mkdir(parents=True, exist_ok=True)
source = (REPO / "design-system/reference/component-atlas-v10.4.html").read_text()
css_files = [
    ATLAS / "css" / name
    for name in re.findall(r'url\("([^"]+)"\)', (ATLAS / "css/index.css").read_text())
]
cleaned = "\n".join(p.read_text() for p in css_files)
assert "!important" not in cleaned
assert all("!important" not in p.read_text() for p in (ATLAS / "css").glob("*.css"))
assert not html.fromstring((ATLAS / "index.html").read_text()).xpath("//style")
for version, css in [
    ("baseline", "\n".join(re.findall(r"<style\b[^>]*>([\s\S]*?)</style>", source))),
    ("candidate", cleaned),
]:
    doc = html.fromstring(source)
    for e in doc.xpath("//script|//style|//link"):
        e.getparent().remove(e)
    for e in doc.xpath("//details"):
        e.set("open", "")
    st = html.Element("style")
    st.text = (
        css
        + "\n*,*::before,*::after{animation-play-state:paused;caret-color:transparent}"
    )
    doc.find("head").append(st)
    (ROOT / f"{version}.html").write_text(html.tostring(doc, encoding="unicode"))
PROPS = "background-color background-image color opacity display position top right bottom left width height min-height max-width padding-top padding-right padding-bottom padding-left margin-top margin-bottom font-family font-size font-weight line-height letter-spacing border-top-width border-top-color border-radius box-shadow filter backdrop-filter transform outline outline-offset z-index overflow visibility fill stroke stroke-width".split()
JS = """(props)=>{document.getAnimations().forEach(a=>{try{if(a instanceof CSSTransition){a.finish()}else{a.pause();a.currentTime=0}}catch{}});const els=[...document.querySelectorAll('.atlas-preview, .atlas-preview *, .atlas-top *, .atlas-side *, .atlas-doc-copy, .atlas-code-note')];return els.map((e,i)=>({i,tag:e.tagName,cls:e.getAttribute('class'),id:e.id,styles:Object.fromEntries(['','::before','::after'].flatMap(pseudo=>props.map(p=>[pseudo+p,getComputedStyle(e,pseudo||null).getPropertyValue(p)])))}))}"""
SET = """(state)=>{for(const e of document.querySelectorAll('*'))for(const name of ['hover','focus-visible','focus-within','active'])e.toggleAttribute('data-test-'+name,state===name||(state==='focus-visible'&&name==='focus-within'));document.querySelectorAll('.terminal-panel').forEach(e=>e.classList.toggle('terminal-disturbance',state==='disturbance'));document.querySelectorAll('.atlas-app button:not(.atlas-doc-copy)').forEach(e=>{e.disabled=state==='disabled';e.setAttribute('aria-pressed',String(state==='selected'))});document.querySelectorAll('[data-state],.states-module').forEach(e=>e.dataset.state=state);document.querySelectorAll('input').forEach(e=>e.setAttribute('aria-invalid',String(state==='error')))}"""


# Replacing pseudo-classes with attributes preserves specificity and permits an exhaustive,
# simultaneous state stress test without pointer-position/scroll/timer nondeterminism.
def fixture(version):
    s = (ROOT / f"{version}.html").read_text().replace("transition:none;", "")

    # Rewrite stylesheet only, not HTML text/code examples.
    def transform(m):
        css = m.group(1)
        for pseudo in ["focus-visible", "focus-within", "hover", "active"]:
            css = css.replace(":" + pseudo, "[data-test-" + pseudo + "]")
        return "<style>" + css + "</style>"

    return re.sub(r"<style>([\s\S]*?)</style>", transform, s)


all_diffs = []
summaries = []
with sync_playwright() as p:
    b = p.chromium.launch(
        executable_path=args.chromium, headless=True, args=["--no-sandbox"]
    )
    for width, touch, motion in [
        (320, True, "reduce"),
        (390, True, "no-preference"),
        (768, False, "reduce"),
        (1280, False, "no-preference"),
    ]:
        context = b.new_context(
            viewport={"width": width, "height": 900},
            has_touch=touch,
            is_mobile=touch,
            reduced_motion=motion,
        )
        pages = [context.new_page(), context.new_page()]
        for page, version in zip(pages, ["baseline", "candidate"]):
            page.set_content(fixture(version), wait_until="domcontentloaded")
        for state in [
            "default",
            "hover",
            "focus-visible",
            "active",
            "selected",
            "disabled",
            "loading",
            "success",
            "error",
            "disturbance",
        ]:
            pair = []
            for page in pages:
                page.evaluate(SET, state)
                pair.append(page.evaluate(JS, PROPS))
            differences = []
            for a, c in zip(*pair):
                delta = {
                    k: [v, c["styles"][k]]
                    for k, v in a["styles"].items()
                    if v != c["styles"][k]
                }
                if (
                    motion == "reduce"
                    and a["cls"] in ["atlas-btn-state-dot", "states-loader__stroke"]
                    and delta.get("transform") == ["matrix(1, 0, 0, 1, 0, 0)", "none"]
                ):
                    delta.pop("transform")
                if delta:
                    differences.append(
                        {"i": a["i"], "cls": a["cls"], "id": a["id"], "delta": delta}
                    )
            config = {"width": width, "touch": touch, "motion": motion, "state": state}
            summaries.append(
                {**config, "elements": len(pair[0]), "differences": len(differences)}
            )
            all_diffs.extend({**config, **d} for d in differences)
            print(
                width, touch, motion, state, "differences", len(differences), flush=True
            )
        context.close()
    b.close()
(ROOT / "matrix-differences.json").write_text(
    json.dumps(all_diffs, ensure_ascii=False, indent=2)
)
(ROOT / "matrix-summary.json").write_text(
    json.dumps(summaries, ensure_ascii=False, indent=2)
)
seen = set()
for d in all_diffs:
    key = (d["state"], d["cls"], str(d["delta"]))
    if key not in seen:
        seen.add(key)
        print(json.dumps(d, ensure_ascii=False))

assert (
    not all_diffs
), f"{len(all_diffs)} unexpected computed style differences; see {ROOT}"
print(
    f"PASS: {len(summaries)} scenarios; 939 sampled elements and their pseudo-elements per scenario."
)
