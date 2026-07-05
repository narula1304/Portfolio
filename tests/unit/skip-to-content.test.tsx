import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkipToContent } from "@/components/atoms/SkipToContent";

describe("SkipToContent", () => {
  it("renders a link targeting #main-content", () => {
    render(<SkipToContent />);
    const link = screen.getByRole("link", { name: /skip to content/i });
    expect(link).toHaveAttribute("href", "#main-content");
  });
});
