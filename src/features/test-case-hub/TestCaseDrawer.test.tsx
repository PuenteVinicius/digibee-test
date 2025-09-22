import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import TestCaseDrawer, { DrawerProps } from "./TestCaseDrawer"; // Adjust the import path

// Mock external dependencies
vi.mock("@heroui/react", () => ({
  addToast: vi.fn(),
}));


vi.mock("./components/levels/MockConfigurationDrawer/MockConfigurationDrawer");
vi.mock("./components/levels/MainDrawer/components/MainLevel/MainLevel");
vi.mock("./components/levels/MainDrawer/MainDrawer");

describe("TestCaseDrawer Component", () => {
  const mockOnCloseDrawer = vi.fn();

  const defaultProps: DrawerProps = {
    isOpen: true,
    onCloseDrawer: mockOnCloseDrawer,
  };

  it("should render MainDrawer when currentLevel is MAIN", () => {
    render(<TestCaseDrawer {...defaultProps} />);

    expect(screen.queryByTestId("mock-config-drawer")).not.toBeInTheDocument();
  });

  it("should not render anything when isOpen is false", () => {
    render(<TestCaseDrawer {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("mock-config-drawer")).not.toBeInTheDocument();
  });
});
