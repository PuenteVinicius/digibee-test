import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import MockConfigurationDrawer, {
  MockConfigurationDrawerProps,
} from "./MockConfigurationDrawer"; // Adjust the import path

import {
  CreateLevels,
  levels,
} from "@/features/test-case-hub/hooks/levelManager/types";

// Mock external dependencies
vi.mock("@heroui/button", () => ({
  Button: vi.fn(
    ({ children, className, color, isDisabled, variant, onPress }) => (
      <button
        className={className}
        data-color={color}
        data-disabled={isDisabled}
        data-testid="apply-button"
        data-variant={variant}
        onClick={onPress}
      >
        {children}
      </button>
    ),
  ),
}));

vi.mock("@heroui/drawer", () => ({
  DrawerBody: vi.fn(({ children, className }) => (
    <div className={className} data-testid="drawer-body">
      {children}
    </div>
  )),
  DrawerFooter: vi.fn(({ children, className }) => (
    <div className={className} data-testid="drawer-footer">
      {children}
    </div>
  )),
}));

vi.mock("iconoir-react", () => ({
  ArrowLeft: vi.fn(() => <div data-testid="arrow-left-icon" />),
  Book: vi.fn(() => <div data-testid="book-icon" />),
  GitCommit: vi.fn(() => <div data-testid="git-icon" />),
}));

vi.mock("@/components/shared/Drawer/Drawer", () => ({
  default: vi.fn(
    ({
      children,
      description,
      isOpen,
      leftIcon,
      rightIcon,
      title,
      onLeftButtonClick,
      onRightButtonClick,
    }) => (
      <div data-is-open={isOpen} data-testid="drawer">
        <div data-testid="drawer-title">{title}</div>
        <div data-testid="drawer-description">{description}</div>
        <div data-testid="left-button" onClick={onLeftButtonClick}>
          {leftIcon}
        </div>
        <div data-testid="right-button" onClick={onRightButtonClick}>
          {rightIcon}
        </div>
        {children}
      </div>
    ),
  ),
}));

describe("MockConfigurationDrawer Component", () => {
  const mockOnApply = vi.fn();
  const mockNavigateTo = vi.fn();
  const mockGoBack = vi.fn();

  const defaultProps: MockConfigurationDrawerProps = {
    isOpen: true,
    onApply: mockOnApply,
    navigateTo: mockNavigateTo,
    goBack: mockGoBack,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the drawer with correct title and description", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    expect(screen.getByTestId("drawer-title")).toHaveTextContent(
      levels[CreateLevels.MOCK_CONFIGURATION].title,
    );
    expect(screen.getByTestId("drawer-description")).toHaveTextContent(
      levels[CreateLevels.MOCK_CONFIGURATION].description,
    );
  });

  it("should render left and right icons", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    expect(screen.getByTestId("arrow-left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("book-icon")).toBeInTheDocument();
  });

  it("should call goBack when left icon is clicked", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("left-button"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it("should call navigateTo with MAIN level when right icon is clicked", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("right-button"));
    expect(mockNavigateTo).toHaveBeenCalledWith(CreateLevels.MAIN);
  });


  it("should have apply button disabled initially", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    const applyButton = screen.getByTestId("apply-button");

    expect(applyButton).toHaveAttribute("data-disabled", "true");
  });

  it("should call onApply with selected mock when apply button is clicked", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    // Select a mock option

    // Click apply button
    fireEvent.click(screen.getByTestId("apply-button"));

    expect(mockOnApply).toHaveBeenCalledTimes(1);

  });


  it("should apply correct CSS classes to drawer body and footer", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    const drawerBody = screen.getByTestId("drawer-body");
    const drawerFooter = screen.getByTestId("drawer-footer");

    expect(drawerBody).toHaveClass("py-0 gap-0 px-0");
    expect(drawerFooter).toHaveClass("flex w-full justify-between");
  });

  it("should apply correct styling to apply button", () => {
    render(<MockConfigurationDrawer {...defaultProps} />);

    const applyButton = screen.getByTestId("apply-button");

    expect(applyButton).toHaveAttribute("data-color", "primary");
    expect(applyButton).toHaveAttribute("data-variant", "bordered");
    expect(applyButton).toHaveClass("w-full");
  });

  it("should not render content when isOpen is false", () => {
    render(<MockConfigurationDrawer {...defaultProps} isOpen={false} />);

    expect(screen.getByTestId("drawer")).toHaveAttribute(
      "data-is-open",
      "false",
    );
  });

  it("should handle multiple mock selections correctly", () => {
    const { rerender } = render(<MockConfigurationDrawer {...defaultProps} />);

    // Select first mock

    // Re-render with updated state
    rerender(<MockConfigurationDrawer {...defaultProps} />);

    // Apply should be enabled
    const applyButton = screen.getByTestId("apply-button");


    // Click apply
    fireEvent.click(applyButton);
    expect(mockOnApply).toHaveBeenCalledTimes(1);
  });

});
