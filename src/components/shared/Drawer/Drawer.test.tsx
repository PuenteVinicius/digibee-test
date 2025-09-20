import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Drawer, { DrawerProps } from "./Drawer"; // ajuste o caminho conforme necessário
import { Button } from "@heroui/button";

// Mock dos componentes externos
vi.mock("@heroui/drawer", () => ({
  Drawer: vi.fn(({ children, isOpen, radius, backdrop, hideCloseButton }) => (
    <div
      data-testid="drawer"
      data-isopen={isOpen}
      data-radius={radius}
      data-backdrop={backdrop}
      data-hideclosebutton={hideCloseButton}
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
  DrawerBody: vi.fn(({ children }) => (
    <div data-testid="drawer-body">{children}</div>
  )),
  DrawerFooter: vi.fn(({ children, className }) => (
    <div className={className} data-testid="drawer-footer">
      {children}
    </div>
  )),
}));

vi.mock("@heroui/button", () => ({
  Button: vi.fn(({ children, onPress, color, variant, className }) => (
    <button
      onClick={onPress}
      data-color={color}
      data-variant={variant}
      data-testid={
        className?.includes("w-full") ? "full-width-button" : "button"
      }
    >
      {children}
    </button>
  )),
}));

// Mock para ícones (simulando ReactElement)
const MockIcon = ({ name }: { name: string }) => (
  <div data-testid={`icon-${name}`}>{name} Icon</div>
);

describe("Drawer Component", () => {
  const defaultProps: DrawerProps = {
    isOpen: true,
    title: "Test Drawer",
    description: "Test description",
    leftIcon: <MockIcon name="left" />,
    rightIcon: <MockIcon name="right" />,
    children: <div data-testid="drawer-content">Drawer Content</div>,
    mainStep: true,
    onLeftButtonClick: vi.fn(),
    onRightButtonClick: vi.fn(),
    onCancelButtonClick: vi.fn(),
    onSave: vi.fn(),
    onApply: vi.fn(),
  };

  const renderComponent = (props: Partial<DrawerProps> = {}) => {
    return render(<Drawer {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render drawer when isOpen is true", () => {
    renderComponent({ isOpen: true });

    expect(screen.getByTestId("drawer")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-content")).toBeInTheDocument();
  });

  it("should not render drawer content when isOpen is false", () => {
    renderComponent({ isOpen: false });

    expect(screen.queryByTestId("drawer-content")).not.toBeInTheDocument();
  });

  it("should render title and description correctly", () => {
    renderComponent();

    expect(screen.getByText("Test Drawer")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should not render description when not provided", () => {
    renderComponent({ description: undefined });

    expect(screen.getByText("Test Drawer")).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("should render left and right icons when provided", () => {
    renderComponent();

    expect(screen.getByTestId("icon-left")).toBeInTheDocument();
    expect(screen.getByTestId("icon-right")).toBeInTheDocument();
  });

  it("should not render icons when not provided", () => {
    renderComponent({ leftIcon: undefined, rightIcon: undefined });

    expect(screen.queryByTestId("icon-left")).not.toBeInTheDocument();
    expect(screen.queryByTestId("icon-right")).not.toBeInTheDocument();
  });

  it("should call onLeftButtonClick when left icon is clicked", () => {
    const onLeftButtonClick = vi.fn();
    renderComponent({ onLeftButtonClick });

    fireEvent.click(screen.getByTestId("icon-left"));
    expect(onLeftButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should call onRightButtonClick when right icon is clicked", () => {
    const onRightButtonClick = vi.fn();
    renderComponent({ onRightButtonClick });

    fireEvent.click(screen.getByTestId("icon-right"));
    expect(onRightButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should render children content in DrawerBody", () => {
    renderComponent();

    expect(screen.getByTestId("drawer-body")).toBeInTheDocument();
    expect(screen.getByText("Drawer Content")).toBeInTheDocument();
  });

  describe("Footer buttons - mainStep true", () => {
    it("should render Cancel and Save buttons when mainStep is true", () => {
      renderComponent({ mainStep: true });

      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("should call onCancelButtonClick when Cancel button is clicked", () => {
      const onCancelButtonClick = vi.fn();
      renderComponent({ onCancelButtonClick });

      fireEvent.click(screen.getByText("Cancel"));
      expect(onCancelButtonClick).toHaveBeenCalledTimes(1);
    });

    it("should call onSave when Save button is clicked", () => {
      const onSave = vi.fn();
      renderComponent({ onSave });

      fireEvent.click(screen.getByText("Save"));
      expect(onSave).toHaveBeenCalledTimes(1);
    });
  });

  describe("Footer buttons - mainStep false", () => {
    it("should render Apply button when mainStep is false", () => {
      renderComponent({ mainStep: false });

      expect(screen.getByText("Apply")).toBeInTheDocument();
      expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });

    it("should call onApply when Apply button is clicked", () => {
      const onApply = vi.fn();
      renderComponent({ mainStep: false, onApply });

      fireEvent.click(screen.getByText("Apply"));
      expect(onApply).toHaveBeenCalledTimes(1);
    });

    it("should render full width button when mainStep is false", () => {
      renderComponent({ mainStep: false });

      expect(screen.getByTestId("full-width-button")).toBeInTheDocument();
    });
  });

  it("should apply correct CSS classes to header", () => {
    renderComponent();

    const header = screen.getByTestId("drawer-header");
    expect(header).toHaveClass("flex");
    expect(header).toHaveClass("flex-col");
    expect(header).toHaveClass("gap-1");
  });

  it("should apply correct CSS classes to footer", () => {
    renderComponent();

    const footer = screen.getByTestId("drawer-footer");
    expect(footer).toHaveClass("flex");
    expect(footer).toHaveClass("w-full");
    expect(footer).toHaveClass("justify-between");
  });

  it("should pass correct props to HeroUiDrawer", () => {
    renderComponent();

    const drawer = screen.getByTestId("drawer");
    expect(drawer).toHaveAttribute("data-isopen", "true");
    expect(drawer).toHaveAttribute("data-radius", "none");
    expect(drawer).toHaveAttribute("data-backdrop", "transparent");
    expect(drawer).toHaveAttribute("data-hideclosebutton", "true");
  });

  it("should render correct typography for title and description", () => {
    renderComponent();

    const title = screen.getByText("Test Drawer");
    expect(title).toHaveClass("text-2xl");
    expect(title).toHaveClass("font-semibold");

    const description = screen.getByText("Test description");
    expect(description).toHaveClass("font-light");
    expect(description).toHaveClass("text-sm");
    expect(description).toHaveClass("text-gray-500");
    expect(description).toHaveClass("leading-5");
  });
});
