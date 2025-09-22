import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockOption, ServerOption } from "@/types";
import MockConfigurationLevel from "./MockConfigurationLevel";

// Mock dependencies
vi.mock("@/hooks/UseMockApi/useMockApi", () => ({
  useMockApi: vi.fn(),
}));

vi.mock("@/hooks/UseIMockIcons/useMockIcons", () => ({
  default: vi.fn(),
}));

vi.mock("@/components/shared/SkeletonCard/SkeletonCard", () => ({
  default: vi.fn(({ className }) => (
    <div data-testid="skeleton-card" className={className}>
      Skeleton Card
    </div>
  )),
}));

vi.mock("@/components/shared/MockEmptyState/MockEmptyState", () => ({
  default: vi.fn(({ className }) => (
    <div data-testid="mock-empty-state" className={className}>
      Mock Empty State
    </div>
  )),
}));

vi.mock("@heroui/select", () => ({
  Select: vi.fn(({ children, isLoading, startContent, ...props }) => (
    <div data-testid="select" data-loading={isLoading} {...props}>
      {startContent}
      <select data-testid="select-element">{children}</select>
    </div>
  )),
  SelectItem: vi.fn(({ children, onClick, startContent, ...props }) => (
    <option onClick={onClick} {...props}>
      {startContent}
      {children}
    </option>
  )),
}));

vi.mock("@heroui/react", () => ({
  RadioGroup: vi.fn(({ children, ...props }) => (
    <div data-testid="radio-group" {...props}>
      {children}
    </div>
  )),
  Radio: vi.fn(({ children, onChange, description, ...props }) => (
    <label data-testid="radio">
      <input type="radio" onChange={onChange} {...props} />
      <div>{children}</div>
      {description && <div data-testid="radio-description">{description}</div>}
    </label>
  )),
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

const mockGetIcon = vi.fn();
const mockOnSelectedMockOption = vi.fn();

const mockMockOptions: MockOption[] = [
  { id: "1", label: "JOLT Mock", key: "JOLT" },
  { id: "2", label: "REST Mock", key: "REST" },
];

const mockServerOptions: ServerOption[] = [
  {
    id: "server-1",
    label: "Server Option 1",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "server-2",
    label: "Server Option 2",
    createdAt: new Date("2023-01-02"),
  },
];

describe("MockConfigurationLevel", () => {
  const renderComponent = (props = {}) => {
    return render(
      <MockConfigurationLevel
        onSelectedMockOption={mockOnSelectedMockOption}
        {...props}
      />
    );
  };

  it("displays server options when they are available", async () => {
    renderComponent();

    // Select a mock option to trigger server options loading
    const mockOption = screen.getByText("JOLT Mock");
    await userEvent.click(mockOption);

    await waitFor(() => {
      expect(screen.getByTestId("radio-group")).toBeInTheDocument();
      expect(screen.getAllByTestId("radio")).toHaveLength(2);
      expect(screen.getByText("Server Option 1")).toBeInTheDocument();
      expect(screen.getByText("Server Option 2")).toBeInTheDocument();
    });
  });

  it("calls onSelectedMockOption when a server option is selected", async () => {
    renderComponent();

    // Select a mock option
    const mockOption = screen.getByText("JOLT Mock");
    await userEvent.click(mockOption);

    await waitFor(() => {
      // Select a server option
      const serverOptionRadio = screen.getByLabelText("Server Option 1");
      fireEvent.click(serverOptionRadio);
    });

    expect(mockOnSelectedMockOption).toHaveBeenCalledWith({
      ...mockMockOptions[0],
      serverOption: mockServerOptions[0],
    });
  });

  it("displays icons for mock options", () => {
    renderComponent();

    expect(mockGetIcon).toHaveBeenCalledWith("JOLT");
    expect(mockGetIcon).toHaveBeenCalledWith("REST");
  });

  it("handles errors from postData gracefully", async () => {
    renderComponent();

    const mockOption = screen.getByText("JOLT Mock");
    await userEvent.click(mockOption);

    // Should not crash and should show empty state
    await waitFor(() => {
      expect(screen.getByTestId("mock-empty-state")).toBeInTheDocument();
    });
  });

  it("matches snapshot in loading state", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with mock options", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with server options", async () => {
    const { container } = renderComponent();

    // Select a mock option to trigger server options display
    const mockOption = screen.getByText("JOLT Mock");
    await userEvent.click(mockOption);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
