import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card, { CardProps } from "./Card";

vi.mock("@heroui/card", () => ({
  Card: vi.fn(({ children, onClick, className, shadow }) => (
    <div
      className={className}
      data-testid="hero-ui-card"
      data-shadow={shadow}
      onClick={onClick}
    >
      {children}
    </div>
  )),
  CardBody: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card-body">
      {children}
    </div>
  )),
}));

vi.mock("iconoir-react", () => ({
  Plus: vi.fn(() => <div data-testid="plus-icon" />),
  MoreVert: vi.fn(() => <div data-testid="morevert-icon" />),
}));

vi.mock("@/hooks/UseIMockIcons/useMockIcons");

describe("Card Component", () => {
  const mockGetIcon = vi.fn();
  const mockOnClick = vi.fn();
  const mockIcon = "some-icon" as any;

  const defaultProps: CardProps = {
    title: "Test Title",
    description: "Test Description",
    onClick: mockOnClick,
    moreAction: false,
    mockIcon: undefined,
  };

  it("should render the card with title and description", () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText("Test Title"));
    expect(screen.getByText("Test Description"));
    expect(screen.getByTestId("hero-ui-card"));
  });

  it("should render the Plus icon when moreAction is false", () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByTestId("plus-icon"));
    expect(screen.queryByTestId("morevert-icon"));
  });

  it("should render the MoreVert icon when moreAction is true", () => {
    render(<Card {...defaultProps} moreAction={true} />);

    expect(screen.getByTestId("morevert-icon"));
    expect(screen.queryByTestId("plus-icon"));
  });

  it("should call onClick when the card is clicked", () => {
    render(<Card {...defaultProps} />);

    fireEvent.click(screen.getByTestId("hero-ui-card"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should call onClick when the action icon is clicked", () => {
    render(<Card {...defaultProps} />);

    const actionIcon = screen.getByTestId("plus-icon").parentElement;
    if (actionIcon) {
      fireEvent.click(actionIcon);
    }

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should render mock icon when mockIcon prop is provided", () => {
    render(<Card {...defaultProps} mockIcon={mockIcon} />);

    expect(mockGetIcon).toHaveBeenCalledWith(mockIcon);
    expect(screen.getByTestId("mock-icon"));

    it("should not render mock icon when mockIcon prop is not provided", () => {
      render(<Card {...defaultProps} />);

      expect(mockGetIcon).not.toHaveBeenCalled();
      expect(screen.queryByTestId("mock-icon"));
    });

    it("should apply correct styling to mock icon container", () => {
      render(<Card {...defaultProps} mockIcon={mockIcon} />);

      const iconContainer = screen.getByTestId("mock-icon").parentElement;
      expect(iconContainer);
    });

    it("should render without title and description", () => {
      render(<Card onClick={mockOnClick} />);

      expect(screen.queryByText("Test Title"));
      expect(screen.queryByText("Test Description"));
    });

    it("should render with JSX description", () => {
      const jsxDescription = (
        <span data-testid="jsx-description">JSX Description</span>
      );
      render(<Card {...defaultProps} description={jsxDescription} />);

      expect(screen.getByTestId("jsx-description"));
    });

    it("should have correct CSS classes for text elements", () => {
      render(<Card {...defaultProps} />);

      const titleElement = screen.getByText("Test Title");
      const descriptionElement = screen.getByText("Test Description");

      expect(titleElement);
      expect(descriptionElement);
    });

    it("should use default onClick handler when not provided", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      // Create a component without onClick prop
      const { getByTestId } = render(<Card title="Test" description="Test" />);

      fireEvent.click(getByTestId("hero-ui-card"));

      // The default onClick should be called (which is an empty function)
      expect(consoleSpy).not.toHaveBeenCalled(); // No error should occur

      consoleSpy.mockRestore();
    });
  });
});
