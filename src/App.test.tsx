import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App"; // ajuste o caminho conforme necessário

// Mock dos componentes externos
vi.mock("@heroui/button", () => ({
  Button: vi.fn(({ children, onPress, color, variant }) => (
    <button
      data-color={color}
      data-testid="open-drawer-button"
      data-variant={variant}
      onClick={onPress}
    >
      {children}
    </button>
  )),
}));

vi.mock("./features/test-case-hub/TestCaseDrawer", () => ({
  default: vi.fn(({ isOpen, onCloseDrawer }) => (
    <div data-isopen={isOpen} data-testid="test-case-drawer">
      {isOpen && (
        <div>
          <span>TestCaseDrawer Component</span>
          <button data-testid="close-drawer-button" onClick={onCloseDrawer}>
            Close Drawer
          </button>
        </div>
      )}
    </div>
  )),
}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the app with button initially", () => {
    render(<App />);

    expect(screen.getByTestId("open-drawer-button")).toBeInTheDocument();
    expect(screen.getByText("Open drawer")).toBeInTheDocument();

    // Drawer deve estar fechado inicialmente
    const drawer = screen.getByTestId("test-case-drawer");

    expect(drawer).toHaveAttribute("data-isopen", "false");
    expect(
      screen.queryByText("TestCaseDrawer Component"),
    ).not.toBeInTheDocument();
  });

  it("should open drawer when button is clicked", () => {
    render(<App />);

    // Drawer inicialmente fechado
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "false",
    );

    // Clicar no botão para abrir o drawer
    fireEvent.click(screen.getByTestId("open-drawer-button"));

    // Drawer deve estar aberto
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "true",
    );
    expect(screen.getByText("TestCaseDrawer Component")).toBeInTheDocument();
  });

  it("should close drawer when onCloseDrawer is called", () => {
    render(<App />);

    // Abrir o drawer primeiro
    fireEvent.click(screen.getByTestId("open-drawer-button"));
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "true",
    );

    // Fechar o drawer através do botão de fechar
    fireEvent.click(screen.getByTestId("close-drawer-button"));

    // Drawer deve estar fechado novamente
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "false",
    );
    expect(
      screen.queryByText("TestCaseDrawer Component"),
    ).not.toBeInTheDocument();
  });

  it("should pass correct props to Button component", () => {
    render(<App />);

    const button = screen.getByTestId("open-drawer-button");

    expect(button).toHaveAttribute("data-color", "primary");
    expect(button).toHaveAttribute("data-variant", "bordered");
  });

  it("should pass correct props to TestCaseDrawer component", () => {
    render(<App />);

    // Abrir o drawer para verificar as props
    fireEvent.click(screen.getByTestId("open-drawer-button"));

    const drawer = screen.getByTestId("test-case-drawer");

    expect(drawer).toHaveAttribute("data-isopen", "true");

    // Verificar se o botão de fechar funciona (testa a prop onCloseDrawer)
    fireEvent.click(screen.getByTestId("close-drawer-button"));
    expect(drawer).toHaveAttribute("data-isopen", "false");
  });

  it("should maintain drawer state correctly after multiple interactions", () => {
    render(<App />);

    // Estado inicial: drawer fechado
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "false",
    );

    // Abrir drawer
    fireEvent.click(screen.getByTestId("open-drawer-button"));
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "true",
    );

    // Fechar drawer
    fireEvent.click(screen.getByTestId("close-drawer-button"));
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "false",
    );

    // Reabrir drawer
    fireEvent.click(screen.getByTestId("open-drawer-button"));
    expect(screen.getByTestId("test-case-drawer")).toHaveAttribute(
      "data-isopen",
      "true",
    );
  });

  it("should render with correct CSS classes", () => {
    const { container } = render(<App />);

    // Verificar classes do container principal
    expect(container.firstChild).toHaveClass("App");

    // Verificar classes do div que contém o botão
    const buttonContainer = container.querySelector(".w-full");

    expect(buttonContainer).toHaveClass("w-full");
    expect(buttonContainer).toHaveClass("h-screen");
    expect(buttonContainer).toHaveClass("flex");
    expect(buttonContainer).toHaveClass("items-center");
    expect(buttonContainer).toHaveClass("justify-center");
  });

  it("should not crash with edge cases", () => {
    // Teste para garantir que o componente não quebra com interações rápidas
    const { unmount } = render(<App />);

    // Múltiplos cliques rápidos
    fireEvent.click(screen.getByTestId("open-drawer-button"));
    fireEvent.click(screen.getByTestId("open-drawer-button"));
    fireEvent.click(screen.getByTestId("open-drawer-button"));

    // Unmount não deve causar erros
    expect(() => unmount()).not.toThrow();
  });
});
