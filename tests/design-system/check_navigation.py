"""Compare standalone Navigation C with the immutable embedded preview."""

import argparse
import base64
import json
import re
from pathlib import Path
from lxml import html
from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser()
parser.add_argument("--chromium", default="/usr/bin/chromium")
parser.add_argument("--output", type=Path, default=REPO / "work/atlas-check")
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=True)
source = (REPO / "design-system/reference/component-atlas-v10.4.html").read_text()
original = base64.b64decode(re.findall(r"atob\('([^']+)'\)", source)[-1]).decode()
cleaned_css = (
    REPO / "design-system/prototypes/components/atlas-clean/css/navigation.css"
).read_text()
original_css = "\n".join(re.findall(r"<style[^>]*>([\s\S]*?)</style>", original))


def fixture(css):
    document = html.fromstring(original)
    for element in document.xpath("//style|//script|//link"):
        element.getparent().remove(element)
    style = html.Element("style")
    style.text = css
    document.find("head").append(style)
    return html.tostring(document, encoding="unicode")


snapshot = """() => [...document.querySelectorAll('body,body *')].map(e => {
 const s = getComputedStyle(e);
 return Object.fromEntries(['display','position','top','bottom','width','height','min-height',
 'background-color','color','font-size','line-height','padding','margin','overflow-x','flex']
 .map(p => [p,s.getPropertyValue(p)]));
})"""
results = []
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        executable_path=args.chromium, args=["--no-sandbox"]
    )
    for width in [390, 768, 1280]:
        context = browser.new_context(
            viewport={"width": width, "height": 900}, reduced_motion="reduce"
        )
        pages = [context.new_page(), context.new_page()]
        for page, css in zip(pages, [original_css, cleaned_css]):
            page.set_content(fixture(css))
        for state in ["default", "menu", "search"]:
            if state != "default":
                for page in pages:
                    page.evaluate(
                        """state => {
                      document.querySelectorAll('dialog').forEach(e=>{if(e.open)e.close()});
                      const ds=document.querySelectorAll('dialog');
                      ds[state==='menu'?0:1].showModal();
                    }""",
                        state,
                    )
            pair = [page.evaluate(snapshot) for page in pages]
            differences = sum(a != b for a, b in zip(*pair))
            results.append(
                {
                    "width": width,
                    "state": state,
                    "elements": len(pair[0]),
                    "differences": differences,
                }
            )
            print(results[-1], flush=True)
        context.close()
    browser.close()
(args.output / "navigation-results.json").write_text(json.dumps(results, indent=2))
assert not any(r["differences"] for r in results)
print("PASS: navigation layout and dialog states at 390/768/1280 px.")
