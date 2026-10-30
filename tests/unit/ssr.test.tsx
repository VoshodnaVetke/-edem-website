// @vitest-environment node
import { renderToString } from "react-dom/server";
import { describe, it, expect } from "vitest";
import {
  Card,
  Frame,
  Button,
  TextField,
  TreeBackground,
  Navigation,
  Loader,
  GlitchText,
  TerminalPanel,
} from "@edem/ui";
describe("server rendering", () => {
  it("renders without window, observers or browser-only imports", () => {
    expect(() =>
      renderToString(
        <>
          <TreeBackground renderer="webgl" />
          <Card>
            <Button>Действие</Button>
            <TextField label="Имя" />
          </Card>
          <TerminalPanel code="EDEN">
            <GlitchText>EDEN.EXE</GlitchText>
          </TerminalPanel>
          <Frame />
          <Loader label="Загрузка" />
          <Navigation brand="ЭДЕМ" items={[]} />
        </>,
      ),
    ).not.toThrow();
  });
  it("emits stable frame paths for hydration", () => {
    expect(renderToString(<Frame variant="double" />)).toBe(
      renderToString(<Frame variant="double" />),
    );
  });
});
describe("SSR seed normalization", () => {
  it.each([0, NaN])("keeps seed %s deterministic", (seed) => {
    expect(renderToString(<Frame seed={seed} />)).toBe(
      renderToString(<Frame seed={seed} />),
    );
  });
});
