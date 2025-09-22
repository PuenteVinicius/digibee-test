import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import MainDrawer from "./MainDrawer";

import { MockOption } from "@/types";
import { CreateLevels } from "@/features/test-case-hub/hooks/levelManager/types";
import Drawer from "@/components/shared/Drawer/Drawer";

// Mock dependencies
vi.mock("@/components/shared/Drawer/Drawer", () => ({
  default: vi.fn(({ children, ...props }) => (
    <div data-testid="drawer" {...props}>
      {children}
    </div>
  )),
}));

vi.mock(
  "@/features/test-case-hub/components/levels/MainDrawer/components/MainLevel/MainLevel",
  () => ({
    default: vi.fn(({ mockOptions, onLevelSelect }) => (
      <div data-testid="main-level">
        {mockOptions.map((option: MockOption) => (
          <button
            key={option.id}
            data-testid={`level-option-${option.id}`}
            onClick={() => onLevelSelect(CreateLevels.MAIN)}
          >
            {option.label}
          </button>
        ))}
      </div>
    )),
  }),
);

vi.mock("@heroui/button", () => ({
  Button: vi.fn(({ children, onPress, ...props }) => (
    <button onClick={onPress} {...props} data-testid="button">
      {children}
    </button>
  )),
}));

vi.mock("@heroui/drawer", () => ({
  DrawerBody: vi.fn(({ children, ...props }) => (
    <div {...props} data-testid="drawer-body">
      {children}
    </div>
  )),
  DrawerFooter: vi.fn(({ children, ...props }) => (
    <div {...props} data-testid="drawer-footer">
      {children}
    </div>
  )),
}));

vi.mock("iconoir-react", () => ({
  Book: vi.fn(() => <div data-testid="book-icon" />),
  Xmark: vi.fn(() => <div data-testid="xmark-icon" />),
}));

describe("MainDrawer", () => {
  const mockProps = {
    isOpen: true,
    mockOptions: [
      { id: "1", label: "Option 1" },
      { id: "2", label: "Option 2" },
    ] as MockOption[],
    onCancelButtonClick: vi.fn(),
    onSave: vi.fn(),
    navigateTo: vi.fn(),
    goBack: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<MainDrawer {...mockProps} />);

    expect(screen.getByTestId("drawer")).toBeInTheDocument();
    expect(screen.getByTestId("main-level")).toBeInTheDocument();
  });

  it("renders correct number of mock options", () => {
    render(<MainDrawer {...mockProps} />);

    const options = screen.getAllByTestId(/level-option-/);

    expect(options).toHaveLength(mockProps.mockOptions.length);
  });

  it("calls navigateTo when a level option is selected", () => {
    render(<MainDrawer {...mockProps} />);

    const firstOption = screen.getByTestId("level-option-1");

    fireEvent.click(firstOption);

    expect(mockProps.navigateTo).toHaveBeenCalledWith(CreateLevels.MAIN);
  });

  it("calls onCancelButtonClick when cancel button is clicked", () => {
    render(<MainDrawer {...mockProps} />);

    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mockProps.onCancelButtonClick).toHaveBeenCalled();
  });

  it("calls onSave when save button is clicked", () => {
    render(<MainDrawer {...mockProps} />);

    const saveButton = screen.getByText("Save");

    fireEvent.click(saveButton);

    expect(mockProps.onSave).toHaveBeenCalled();
  });

  it("enables save button when mock options are provided", () => {
    render(<MainDrawer {...mockProps} />);

    const saveButton = screen.getByText("Save");

    expect(saveButton).not.toBeDisabled();
  });

  it("renders drawer body and footer components", () => {
    render(<MainDrawer {...mockProps} />);

    expect(screen.getByTestId("drawer-body")).toBeInTheDocument();
    expect(screen.getByTestId("drawer-footer")).toBeInTheDocument();
  });

  it("calls goBack when drawer left button is clicked", () => {
    // We need to mock the Drawer component to simulate the left button click
    vi.mocked(Drawer).mockImplementation(
      ({ onLeftButtonClick, children, ...props }) => (
        <div data-testid="drawer" {...props}>
          <button data-testid="left-button" onClick={onLeftButtonClick}>
            Left Button
          </button>
          {children}
        </div>
      ),
    );

    render(<MainDrawer {...mockProps} />);

    const leftButton = screen.getByTestId("left-button");

    fireEvent.click(leftButton);

    expect(mockProps.goBack).toHaveBeenCalled();
  });
});
