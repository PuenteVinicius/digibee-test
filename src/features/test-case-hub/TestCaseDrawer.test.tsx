import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { addToast } from "@heroui/react";

import TestCaseDrawer, { DrawerProps } from "./TestCaseDrawer"; // Adjust the import path
import { CreateLevels } from "./hooks/levelManager/types";

// Mock external dependencies
vi.mock("@heroui/react", () => ({
  addToast: vi.fn(),
}));

vi.mock("./hooks/levelManager/useLevelManager");
vi.mock("./components/levels/MockConfigurationDrawer/MockConfigurationDrawer");
vi.mock("./components/levels/MainDrawer/MainDrawer");

describe("TestCaseDrawer Component", () => {
  const mockOnCloseDrawer = vi.fn();
  const mockNavigateTo = vi.fn();

  const defaultProps: DrawerProps = {
    isOpen: true,
    onCloseDrawer: mockOnCloseDrawer,
  };

  it("should render MainDrawer when currentLevel is MAIN", () => {
    render(<TestCaseDrawer {...defaultProps} />);

    expect(screen.getByTestId("main-drawer")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-config-drawer")).not.toBeInTheDocument();
  });

  it("should call onCloseDrawer when MainDrawer calls goBack", () => {
    render(<TestCaseDrawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("main-go-back"));
    expect(mockOnCloseDrawer).toHaveBeenCalledTimes(1);
  });

  it("should call navigateTo when MainDrawer requests navigation", () => {
    render(<TestCaseDrawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("navigate-to-mock"));
    expect(mockNavigateTo).toHaveBeenCalledWith(
      CreateLevels.MOCK_CONFIGURATION,
    );
  });

  it("should close drawer and reset mock options when cancel button is clicked", () => {
    render(<TestCaseDrawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("cancel-button"));
    expect(mockOnCloseDrawer).toHaveBeenCalledTimes(1);
  });

  it("should call saveMockTest and show success toast when save button is clicked", () => {
    render(<TestCaseDrawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("save-button"));

    expect(addToast).toHaveBeenCalledWith({
      description: "Your test has been created successfully.",
      color: "success",
    });
    expect(mockOnCloseDrawer).toHaveBeenCalledTimes(1);
  });

  it("should not render anything when isOpen is false", () => {
    render(<TestCaseDrawer {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("main-drawer")).not.toBeInTheDocument();
    expect(screen.queryByTestId("mock-config-drawer")).not.toBeInTheDocument();
  });
});
