import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ALL_GAME_TAGS,
  GAME_TAG_COLORS,
  GAME_TAGS,
  GameFocusDisplay,
  GameTagBadge,
  getGameTag,
  isValidGameFocus,
} from "@edem/ui";

describe("approved game taxonomy", () => {
  it("contains exactly 40 unique tags and approved neon values", () => {
    expect(ALL_GAME_TAGS).toHaveLength(40);
    expect(new Set(ALL_GAME_TAGS.map((tag) => tag.id)).size).toBe(40);
    expect(
      ALL_GAME_TAGS.every((tag) =>
        Object.values(GAME_TAG_COLORS).includes(tag.color as never),
      ),
    ).toBe(true);
    expect(GAME_TAGS.format).toHaveLength(4);
    expect(GAME_TAGS.theme).toHaveLength(7);
  });

  it("renders the canonical label and color from an ID", () => {
    render(<GameTagBadge tag="chamber" />);
    const tag = screen.getByText("Кабинетная ролевая игра");
    expect(tag).toHaveAttribute("data-tag-id", "chamber");
    expect(tag).toHaveStyle({ "--edem-tag-neon": "#BC5CFF" });
    expect(getGameTag("20-to-40").color).toBe("#BC5CFF");
  });

  it("requires ten allocated focus points with each value <= 5", () => {
    expect(isValidGameFocus({ social: 4, combat: 2, systems: 4 })).toBe(true);
    expect(isValidGameFocus({ social: 5, combat: 5, systems: 5 })).toBe(false);
    expect(isValidGameFocus({ social: 6, combat: 0, systems: 4 })).toBe(false);
    expect(isValidGameFocus({ social: 3.5, combat: 3, systems: 3.5 })).toBe(
      false,
    );
    render(<GameFocusDisplay focus={{ social: 4, combat: 2, systems: 4 }} />);
    expect(screen.getByRole("img", { name: "Социалка: 4 из 5" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Боёвка: 2 из 5" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Механики: 4 из 5" })).toBeVisible();
  });
});
