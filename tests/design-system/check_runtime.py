from pathlib import Path
import json, mimetypes
from playwright.sync_api import sync_playwright
import argparse

REPO = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser()
parser.add_argument("--output", type=Path, default=REPO / "work/atlas-check")
parser.add_argument("--chromium", default="/usr/bin/chromium")
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=True)
ROOT = REPO / "design-system/prototypes/components/atlas-clean"
with sync_playwright() as p:
    b = p.chromium.launch(
        executable_path=args.chromium, headless=True, args=["--no-sandbox"]
    )
    results = []
    for width, touch in [(390, True), (1280, False)]:
        ctx = b.new_context(
            viewport={"width": width, "height": 900},
            has_touch=touch,
            is_mobile=touch,
            reduced_motion="reduce",
        )

        def route(r):
            u = r.request.url
            if u.startswith("http://edem.test/"):
                path = (
                    ROOT / u.removeprefix("http://edem.test/").split("?", 1)[0]
                ).resolve()
                if ROOT in path.parents and path.is_file():
                    r.fulfill(
                        body=path.read_bytes(),
                        content_type=mimetypes.guess_type(str(path))[0] or "text/plain",
                    )
                else:
                    r.fulfill(status=404, body="Not found")
            else:
                r.abort()

        ctx.route("**/*", route)
        page = ctx.new_page()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.add_init_script(
            "Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.__copied=text}}})"
        )
        page.goto("http://edem.test/index.html", wait_until="load", timeout=30000)
        page.wait_for_timeout(500)
        print("loaded", width, flush=True)
        cards = page.locator("article.atlas-card").count()
        assert cards == 37
        page.locator("#atlasSearch").fill("карточка-ссылка")
        assert page.locator("article.atlas-card:visible").count() == 1
        page.locator("#atlasSearch").fill("")
        page.locator('[data-filter="preliminary"]').click()
        assert page.locator("article.atlas-card:visible").count() == 4
        page.locator('[data-filter="all"]').click()
        page.locator("#element-16 details").evaluate("(e)=>e.open=true")
        page.locator("#element-16 .atlas-doc-copy").first.click()
        assert page.evaluate("window.__copied.length") > 0
        # Navigation must load as a readable same-origin document, with no encoded source.
        nav = page.frame_locator("#atlasNavFrame")
        assert nav.locator(".site-header").count() == 1
        print("functional", width, flush=True)
        result = {
            "width": width,
            "cards": cards,
            "errors": errors,
            "horizontalOverflow": page.evaluate(
                "document.documentElement.scrollWidth>innerWidth"
            ),
        }
        results.append(result)
        print(result, flush=True)
        ctx.close()
    b.close()
(args.output / "runtime-results.json").write_text(
    json.dumps(results, ensure_ascii=False, indent=2)
)
assert not any(x["errors"] for x in results)

assert not any(x["horizontalOverflow"] for x in results)
print(
    "PASS: runtime, search, filters, copy and navigation at 390 and 1280 px; external resources blocked."
)
