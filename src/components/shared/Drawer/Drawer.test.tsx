import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Drawer, { DrawerProps } from "./Drawer"; // Adjust the import path

// Mock external dependencies
vi.mock("@heroui/drawer", () => ({
  Drawer: vi.fn(({ children, isOpen, hideCloseButton, backdrop, radius }) => (
    <div
      data-backdrop={backdrop}
      data-hide-close-button={hideCloseButton}
      data-is-open={isOpen}
      data-radius={radius}
      data-testid="hero-ui-drawer"
    >
      {isOpen && children}
    </div>
  )),
  DrawerContent: vi.fn(({ children }) => (
    <div data-testid="drawer-content">{children}</div>
  )),
  DrawerHeader: vi.fn(({ children, className }) => (
    <div className={className} data-testid="drawer-header">
      {children}
    </div>
  )),
}));

describe("Drawer Component", () => {
  const mockOnLeftButtonClick = vi.fn();
  const mockOnRightButtonClick = vi.fn();
  const mockLeftIcon = <div data-testid="left-icon">Left Icon</div>;
  const mockRightIcon = <div data-testid="right-icon">Right Icon</div>;
  const mockChildren = <div data-testid="drawer-children">Drawer Content</div>;

  const defaultProps: DrawerProps = {
    isOpen: true,
    title: "Test Title",
    description: "Test Description",
    leftIcon: mockLeftIcon,
    rightIcon: mockRightIcon,
    children: mockChildren,
    onLeftButtonClick: mockOnLeftButtonClick,
    onRightButtonClick: mockOnRightButtonClick,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the drawer when isOpen is true", () => {
    render(<Drawer {...defaultProps} />);

    expect(screen.getByTestId("hero-ui-drawer")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-header")).toBeInTheDocument();
  });

  it("should not render drawer content when isOpen is false", () => {
    render(<Drawer {...defaultProps} isOpen={false} />);

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("drawer-header")).not.toBeInTheDocument();
  });

  it("should render title and description correctly", () => {
    render(<Drawer {...defaultProps} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("should render both left and right icons when provided", () => {
    render(<Drawer {...defaultProps} />);

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("should not render left icon when not provided", () => {
    render(<Drawer {...defaultProps} leftIcon={undefined} />);

    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
  });

  it("should not render right icon when not provided", () => {
    render(<Drawer {...defaultProps} rightIcon={undefined} />);

    expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
  });

  it("should call onLeftButtonClick when left icon is clicked", () => {
    render(<Drawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("left-icon"));
    expect(mockOnLeftButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should call onRightButtonClick when right icon is clicked", () => {
    render(<Drawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId("right-icon"));
    expect(mockOnRightButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should render children content", () => {
    render(<Drawer {...defaultProps} />);

    expect(screen.getByTestId("drawer-children")).toBeInTheDocument();
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    render(<Drawer {...defaultProps} description={undefined} />);

    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("should apply correct CSS classes to title and description", () => {
    render(<Drawer {...defaultProps} />);

    const titleElement = screen.getByText("Test Title");
    const descriptionElement = screen.getByText("Test Description");

    expect(titleElement).toHaveClass("text-[22px] font-[700]");
    expect(descriptionElement).toHaveClass(
      "mt-2 font-[400] tracking-wide text-sm text-gray-500 leading-5",
    );
  });

  it("should pass correct props to HeroUiDrawer", () => {
    render(<Drawer {...defaultProps} />);

    const drawer = screen.getByTestId("hero-ui-drawer");

    expect(drawer).toHaveAttribute("data-is-open", "true");
    expect(drawer).toHaveAttribute("data-hide-close-button", "true");
    expect(drawer).toHaveAttribute("data-backdrop", "transparent");
    expect(drawer).toHaveAttribute("data-radius", "none");
  });

  it("should apply correct CSS classes to DrawerHeader", () => {
    render(<Drawer {...defaultProps} />);

    const drawerHeader = screen.getByTestId("drawer-header");

    expect(drawerHeader).toHaveClass("flex flex-col gap-0 pb-0");
  });

  it("should render without any icons", () => {
    render(
      <Drawer
        children={mockChildren}
        isOpen={true}
        leftIcon={undefined}
        rightIcon={undefined}
        title="Test Title"
        onLeftButtonClick={mockOnLeftButtonClick}
        onRightButtonClick={mockOnRightButtonClick}
      />,
    );

    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render with only left icon", () => {
    render(<Drawer {...defaultProps} rightIcon={undefined} />);

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
  });

  it("should render with only right icon", () => {
    render(<Drawer {...defaultProps} leftIcon={undefined} />);

    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("left-icon")).not.toBeInTheDocument();
  });
});
