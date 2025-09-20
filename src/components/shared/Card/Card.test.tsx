import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Card, { CardProps } from "./Card"; // ajuste o caminho conforme necessário

// Mock dos componentes externos
vi.mock("@heroui/card", () => ({
  Card: vi.fn(({ children, onClick, className }) => (
    <div onClick={onClick} className={className} data-testid="card">
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
  Plus: vi.fn(() => <div data-testid="plus-icon">+</div>),
}));

describe("Card Component", () => {
  const defaultProps: CardProps = {
    title: "Test Card",
    description: "Test description",
    onClick: vi.fn(),
  };

  const renderComponent = (props: Partial<CardProps> = {}) => {
    return render(<Card {...defaultProps} {...props} />);
  };

  it("should render the card with title and description", () => {
    renderComponent();

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should render without description when not provided", () => {
    renderComponent({ description: undefined });

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.queryByText("Test description")).not.toBeInTheDocument();
  });

  it("should call onClick when the card is clicked", () => {
    const handleClick = vi.fn();
    renderComponent({ onClick: handleClick });

    const card = screen.getByTestId("card");
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should call onClick when the plus icon is clicked", () => {
    const handleClick = vi.fn();
    renderComponent({ onClick: handleClick });

    const plusIcon = screen.getByTestId("plus-icon");
    fireEvent.click(plusIcon);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should apply correct CSS classes", () => {
    renderComponent();

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("w-full");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("border-gray-200");

    const cardBody = screen.getByTestId("card-body");
    expect(cardBody).toHaveClass("pt-0");
    expect(cardBody).toHaveClass("pb-2");
    expect(cardBody).toHaveClass("flex");
    expect(cardBody).toHaveClass("flex-row");
    expect(cardBody).toHaveClass("justify-between");
    expect(cardBody).toHaveClass("items-center");
  });

  it("should render the Plus icon", () => {
    renderComponent();

    expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
  });

  it("should have correct typography classes", () => {
    renderComponent();

    const title = screen.getByText("Test Card");
    expect(title).toHaveClass("text-sm");
    expect(title).toHaveClass("font-medium");

    const description = screen.getByText("Test description");
    expect(description).toHaveClass("font-light");
    expect(description).toHaveClass("text-sm");
    expect(description).toHaveClass("text-gray-500");
    expect(description).toHaveClass("leading-5");
  });

  it("should use default onClick function when not provided", () => {
    // Teste para garantir que o default function não quebra
    renderComponent({ onClick: undefined });

    const card = screen.getByTestId("card");
    expect(() => fireEvent.click(card)).not.toThrow();
  });
});
