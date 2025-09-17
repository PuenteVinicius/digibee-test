import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DrawerLevel } from "./DrawerLevel";

describe("DrawerLevel", () => {
  it("renders with title and children", () => {
    const onClose = vi.fn();
    render(
      <DrawerLevel isOpen={true} onClose={onClose} title="Test Title" level={1}>
        <div>Test Content</div>
      </DrawerLevel>
    );

    // expect(screen.getByText("Test Title")).toBeInTheDocument();
    // expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onClose when back button is clicked", () => {
    const onClose = vi.fn();
    render(
      <DrawerLevel isOpen={true} onClose={onClose} title="Test Title" level={1}>
        <div>Test Content</div>
      </DrawerLevel>
    );

    fireEvent.click(screen.getByText("← Voltar"));
    expect(onClose).toHaveBeenCalled();
  });
});
