import { createRef, StrictMode, useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  Button,
  ButtonLink,
  Chip,
  LinkCard,
  TextField,
  Progress,
  Navigation,
  StatusPanel,
  Frame,
  TreeBackground,
} from "@edem/ui";

describe("public React contracts", () => {
  it("disables loading buttons, forwards refs, and does not submit forms by default", () => {
    const ref = createRef<HTMLButtonElement>(),
      click = vi.fn();
    const { rerender } = render(
      <Button ref={ref} state="loading" onClick={click}>
        Сохранить
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Сохранить" });
    expect(ref.current).toBe(button);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(click).not.toHaveBeenCalled();
    rerender(<Button onClick={click}>Сохранить</Button>);
    expect(button).toHaveAttribute("type", "button");
    fireEvent.click(button);
    expect(click).toHaveBeenCalledOnce();
  });
  it("makes a chip selection controlled and exposes it to assistive technology", () => {
    function Example() {
      const [selected, set] = useState(false);
      return (
        <Chip selected={selected} onClick={() => set(!selected)}>
          Игры
        </Chip>
      );
    }
    render(<Example />);
    const chip = screen.getByRole("button", { name: "Игры" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
  });
  it("retains real anchor semantics for navigational components", () => {
    render(
      <>
        <ButtonLink href="/games">Архив</ButtonLink>
        <LinkCard href="/events">Афиша</LinkCard>
      </>,
    );
    expect(screen.getByRole("link", { name: "Архив" })).toHaveAttribute(
      "href",
      "/games",
    );
    expect(screen.getByRole("link", { name: "Афиша" })).toHaveAttribute(
      "href",
      "/events",
    );
  });
  it("associates labels, description and error without discarding host descriptions", () => {
    const { rerender } = render(
      <>
        <p id="help">Помощь</p>
        <TextField
          label="Имя"
          description="Введите имя"
          error="Обязательное поле"
          aria-describedby="help"
        />
      </>,
    );
    const input = screen.getByRole("textbox", { name: "Имя" });
    expect(input).toHaveAccessibleDescription(
      "Помощь Введите имя Обязательное поле",
    );
    expect(input).toHaveAttribute("aria-invalid", "true");
    rerender(<TextField label="Имя" success="Сохранено" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "Сохранено",
    );
  });
  it.each([
    [150, "100"],
    [-20, "0"],
    [42, "42"],
    [undefined, null],
    [NaN, null],
  ])("handles actual progress %s", (value, expected) => {
    render(<Progress label="Передача" value={value} />);
    const progress = screen.getByRole("progressbar", { name: "Передача" });
    if (expected === null)
      expect(progress).not.toHaveAttribute("aria-valuenow");
    else expect(progress).toHaveAttribute("aria-valuenow", expected);
  });
  it("keeps async panel state controlled instead of scheduling success", () => {
    const { rerender } = render(
      <StatusPanel state="loading" statusLabel="Получение данных" />,
    );
    expect(screen.getByRole("article")).toHaveAttribute("aria-busy", "true");
    rerender(<StatusPanel state="error" statusLabel="Ошибка сети" />);
    expect(screen.getByText("Ошибка сети")).toBeVisible();
    expect(screen.queryByText("Получение данных")).not.toBeInTheDocument();
  });
  it("renders deterministic seeded geometry independently of sibling ordering", () => {
    const { container, rerender } = render(<Frame variant="asym" seed={42} />);
    const paths = [...container.querySelectorAll("path")].map((p) =>
      p.getAttribute("d"),
    );
    rerender(<Frame variant="asym" seed={42} />);
    expect(
      [...container.querySelectorAll("path")].map((p) => p.getAttribute("d")),
    ).toEqual(paths);
  });
  it("cleans ResizeObservers in StrictMode and on unmount", () => {
    const disconnect = vi.fn();
    vi.stubGlobal(
      "ResizeObserver",
      class {
        observe() {}
        disconnect = disconnect;
      },
    );
    const { unmount } = render(
      <StrictMode>
        <Button>Тест</Button>
        <TreeBackground />
      </StrictMode>,
    );
    unmount();
    expect(disconnect.mock.calls.length).toBeGreaterThanOrEqual(2);
    vi.unstubAllGlobals();
  });
  it("aborts a stale search and ignores its eventual response", async () => {
    let finish: (value: { label: string; href: string }[]) => void = () => {};
    let firstSignal: AbortSignal | undefined;
    const search = vi.fn((q: string, signal: AbortSignal) => {
      if (q === "old") {
        firstSignal = signal;
        return new Promise<{ label: string; href: string }[]>((resolve) => {
          finish = resolve;
        });
      }
      return Promise.resolve([{ label: "Новый результат", href: "/new" }]);
    });
    render(<Navigation brand="ЭДЕМ" items={[]} onSearch={search} />);
    fireEvent.click(screen.getByRole("button", { name: "Поиск" }));
    const input = screen.getByRole("searchbox", { name: "Поисковый запрос" });
    fireEvent.change(input, { target: { value: "old" } });
    await waitFor(() => expect(search).toHaveBeenCalledOnce());
    fireEvent.change(input, { target: { value: "new" } });
    await screen.findByRole("link", { name: "Новый результат" });
    expect(firstSignal?.aborted).toBe(true);
    finish([{ label: "Устаревший результат", href: "/old" }]);
    await Promise.resolve();
    expect(screen.queryByText("Устаревший результат")).not.toBeInTheDocument();
  });
});
