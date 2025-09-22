import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import MainLevel from "./MainLevel"; // ajuste o caminho
import { PATH_OPTIONS, PATH_CONDITIONS } from "./constants";

import { CreateLevels } from "@/features/test-case-hub/hooks/levelManager/types";
import { MockOption } from "@/types";

// Mock dos componentes externos
vi.mock("@/components/shared/Card/Card", () => ({
  default: vi.fn(({ title, description, onClick }) => (
    <div data-testid="card" onClick={onClick}>
      <h3 data-testid="card-title">{title}</h3>
      <p data-testid="card-description">{description}</p>
    </div>
  )),
}));

vi.mock("@heroui/switch", () => ({
  Switch: vi.fn(({ className, size, isSelected, onChange }) => (
    <input
      checked={isSelected}
      className={className}
      data-selected={isSelected}
      data-size={size}
      data-testid="switch"
      type="checkbox"
      onChange={onChange}
    />
  )),
}));

vi.mock("@heroui/form", () => ({
  Form: vi.fn(({ children, className }) => (
    <form className={className} data-testid="form">
      {children}
    </form>
  )),
}));

vi.mock("@heroui/input", () => ({
  Input: vi.fn(
    ({
      color,
      radius,
      isRequired,
      label,
      labelPlacement,
      name,
      placeholder,
      type,
      classNames,
    }) => (
      <div data-name={name} data-testid="input" data-type={type}>
        <label data-placement={labelPlacement}>{label}</label>
        <input
          className={classNames?.inputWrapper}
          data-color={color}
          data-radius={radius}
          placeholder={placeholder}
          required={isRequired}
        />
      </div>
    )
  ),
  Textarea: vi.fn(
    ({
      radius,
      isRequired,
      label,
      labelPlacement,
      name,
      placeholder,
      type,
      classNames,
    }) => (
      <div data-name={name} data-testid="textarea" data-type={type}>
        <label data-placement={labelPlacement}>{label}</label>
        <textarea
          className={classNames?.inputWrapper}
          data-radius={radius}
          placeholder={placeholder}
          required={isRequired}
        />
      </div>
    )
  ),
}));

vi.mock("@heroui/select", () => ({
  Select: vi.fn(({ children, className, radius, label, classNames }) => (
    <div
      className={className}
      data-classnames={JSON.stringify(classNames)}
      data-label={label}
      data-radius={radius}
      data-testid="select"
    >
      {children}
    </div>
  )),
  SelectItem: vi.fn(({ children, key }) => (
    <div key={key} data-testid="select-item">
      {children}
    </div>
  )),
}));

// Mock das constantes
vi.mock("./constants", () => ({
  PATH_OPTIONS: [
    { title: "Path Option 1", description: "Description 1" },
    { title: "Path Option 2", description: "Description 2" },
  ],
  PATH_CONDITIONS: [
    {
      title: "Condition 1",
      description: "Condition Desc 1",
      level: CreateLevels.MOCK_CONFIGURATION,
    },
  ],
  Option: {} as any,
}));

describe("MainLevel", () => {
  const mockOnLevelSelect = vi.fn();
  const mockSelectedMockOptions: MockOption[] = [
    { id: "1", label: "Mock Option 1", key: "REST" },
    { id: "2", label: "Mock Option 2", key: "JOLT" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (selectedMockOptions: MockOption[] = []) => {
    return render(
      <MainLevel
        mockOptions={selectedMockOptions}
        onLevelSelect={mockOnLevelSelect}
      />
    );
  };

  it("should render all sections correctly", () => {
    renderComponent();

    expect(screen.getByText("Define Path")).toBeInTheDocument();
    expect(screen.getByText("Define the conditions")).toBeInTheDocument();
    expect(screen.getByText("Organize your Tests")).toBeInTheDocument();
  });

  it("should render PATH_OPTIONS cards", () => {
    renderComponent();

    const cards = screen.getAllByTestId("card");

    expect(cards).toHaveLength(2); // PATH_OPTIONS
    expect(screen.getByText("Path Option 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("should render PATH_CONDITIONS cards", () => {
    renderComponent();

    const conditionCards = screen.getAllByTestId("card");

    expect(conditionCards.length).toBeGreaterThan(0);
    expect(screen.getByText("Condition 1")).toBeInTheDocument();
    expect(screen.getByText("Condition Desc 1")).toBeInTheDocument();
  });

  it("should render the form with all inputs", () => {
    renderComponent();

    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
    expect(screen.getByTestId("textarea")).toBeInTheDocument();
    expect(screen.getByTestId("select")).toBeInTheDocument();
  });

  it("should render switch with correct initial state", () => {
    renderComponent();

    const switchElement = screen.getByTestId("switch");

    expect(switchElement).toHaveAttribute("data-selected", "false");
    expect(screen.getByText("Full flow (8 steps)")).toBeInTheDocument();
  });

  it("should toggle switch when clicked", () => {
    renderComponent();

    const switchElement = screen.getByTestId("switch");

    expect(switchElement).toHaveAttribute("data-selected", "false");

    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();
  });

  it("should not call onLevelSelect when card has no level", () => {
    renderComponent();

    // PATH_OPTIONS cards não têm level
    const pathOptionCards = screen.getAllByTestId("card").slice(0, 2);

    fireEvent.click(pathOptionCards[0]);

    expect(mockOnLevelSelect).not.toHaveBeenCalled();
  });

  it("should render selected mock options when they exist and condition is MOCK_CONFIGURATION", () => {
    renderComponent(mockSelectedMockOptions);

    // Verificar se os cards dos mock options são renderizados
    expect(screen.getByText("Mock Option 1")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // description é o id
    expect(screen.getByText("Mock Option 2")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should render condition card when no selected mock options for MOCK_CONFIGURATION", () => {
    renderComponent([]);

    // Deve renderizar o card normal para MOCK_CONFIGURATION
    expect(screen.getByText("Condition 1")).toBeInTheDocument();
    expect(screen.getByText("Condition Desc 1")).toBeInTheDocument();
  });

  it("should render select with animal options", () => {
    renderComponent();

    const select = screen.getByTestId("select");

    expect(select).toBeInTheDocument();

    const selectItems = screen.getAllByTestId("select-item");

    expect(selectItems.length).toBeGreaterThan(0);
  });

  it("should apply correct CSS classes to form elements", () => {
    renderComponent();

    const inputWrapper = screen.getByTestId("input").querySelector("input");

    expect(inputWrapper).toHaveClass("bg-white");
    expect(inputWrapper).toHaveClass("border-b");
    expect(inputWrapper).toHaveClass("border-gray-200");

    const textareaWrapper = screen
      .getByTestId("textarea")
      .querySelector("textarea");

    expect(textareaWrapper).toHaveClass("bg-white");
    expect(textareaWrapper).toHaveClass("border-b");
    expect(textareaWrapper).toHaveClass("border-gray-200");
  });

  it("should render with proper typography classes", () => {
    const { container } = renderComponent();

    const headings = container.querySelectorAll("h2");

    headings.forEach((heading) => {
      expect(heading).toHaveClass("uppercase");
      expect(heading).toHaveClass("font-semibold");
      expect(heading).toHaveClass("text-xs");
      expect(heading).toHaveClass("tracking-widest");
    });
  });

  describe("Form validation", () => {
    it("should have required inputs", () => {
      renderComponent();

      const input = screen.getByTestId("input").querySelector("input");
      const textarea = screen.getByTestId("textarea").querySelector("textarea");

      expect(input).toBeRequired();
      expect(textarea).toBeRequired();
    });

    it("should have correct input types and placeholders", () => {
      renderComponent();

      const input = screen.getByTestId("input").querySelector("input");
      const textarea = screen.getByTestId("textarea").querySelector("textarea");

      expect(input).toHaveAttribute("placeholder", "Enter your name");
      expect(input).toHaveAttribute("type", "text");
      expect(textarea).toHaveAttribute("placeholder", "Enter your description");
    });
  });

  describe("Edge cases", () => {
    it("should handle empty selectedMockOptions array", () => {
      renderComponent([]);

      // Deve renderizar cards normais
      expect(screen.getAllByTestId("card").length).toBeGreaterThan(0);
    });

    it("should handle undefined selectedMockOptions", () => {
      // @ts-ignore - testando caso edge
      renderComponent(undefined);

      // Deve renderizar normalmente sem quebrar
      expect(screen.getByText("Define Path")).toBeInTheDocument();
    });

    it("should not break when PATH_OPTIONS or PATH_CONDITIONS are empty", () => {
      // Mock arrays vazios temporariamente
      vi.mocked(PATH_OPTIONS).length = 0;
      vi.mocked(PATH_CONDITIONS).length = 0;

      renderComponent();

      // Deve renderizar sem errors
      expect(screen.getByText("Define Path")).toBeInTheDocument();

      // Restaurar mocks
      vi.mocked(PATH_OPTIONS).push(
        { title: "Path Option 1", description: "Description 1" },
        { title: "Path Option 2", description: "Description 2" }
      );
      vi.mocked(PATH_CONDITIONS).push({
        title: "Condition 1",
        description: "Condition Desc 1",
        level: CreateLevels.MOCK_CONFIGURATION,
      });
    });
  });
});
