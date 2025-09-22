import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import MockConfigurationLevel from "./MockConfigurationLevel"; // ajuste o caminho

import { useMockApi } from "@/hooks/UseMockApi/useMockApi";

// Mock dos hooks e componentes externos
vi.mock("@/hooks/UseMockApi/useMockApi", () => ({
  useMockApi: vi.fn(),
}));

vi.mock("@heroui/select", () => ({
  Select: vi.fn(({ children, isLoading, placeholder, classNames }) => (
    <div
      data-classnames={JSON.stringify(classNames)}
      data-isloading={isLoading}
      data-placeholder={placeholder}
      data-testid="select"
    >
      {children}
    </div>
  )),
  SelectItem: vi.fn(({ children, onClick, key }) => (
    <div key={key} data-testid="select-item" onClick={onClick}>
      {children}
    </div>
  )),
}));

vi.mock("@heroui/skeleton", () => ({
  Skeleton: vi.fn(({ className }) => (
    <div className={className} data-testid="skeleton" />
  )),
}));

vi.mock("@heroui/react", () => ({
  RadioGroup: vi.fn(({ children, className, isRequired }) => (
    <div
      className={className}
      data-required={isRequired}
      data-testid="radio-group"
    >
      {children}
    </div>
  )),
  Radio: vi.fn(({ children, description, value }) => (
    <div data-description={description} data-testid="radio" data-value={value}>
      {children}
    </div>
  )),
}));

vi.mock("iconoir-react", () => ({
  GitCommit: vi.fn(() => <div data-testid="git-commit-icon">GitCommit</div>),
}));

const mockMockOptions = [
  { id: "1", label: "Session Management", svgPath: "HTTP" },
  { id: "2", label: "Rest V2", svgPath: "DB" },
];

const mockServerOptions = [
  { id: "1", label: "Mocked response #1", createdAt: new Date("2024-01-01") },
  { id: "2", label: "Mocked response #2", createdAt: new Date("2024-01-02") },
];

describe("MockConfigurationLevel", () => {
  const mockOnSelectedMockOption = vi.fn();
  const mockPostData = vi.fn();
  const mockUseMockApi = useMockApi as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseMockApi.mockReturnValue({
      postData: mockPostData,
      mockOptions: mockMockOptions,
      loading: false,
    });
  });

  const renderComponent = () => {
    return render(
      <MockConfigurationLevel
        onSelectedMockOption={mockOnSelectedMockOption}
      />,
    );
  };

  it("should render select with mock options", () => {
    renderComponent();

    expect(screen.getByTestId("select")).toBeInTheDocument();
    expect(screen.getAllByTestId("select-item")).toHaveLength(2);
    expect(screen.getByText("Session Management")).toBeInTheDocument();
    expect(screen.getByText("Rest V2")).toBeInTheDocument();
  });

  it("should show placeholder when no option is selected", () => {
    renderComponent();

    const select = screen.getByTestId("select");

    expect(select).toHaveAttribute(
      "data-placeholder",
      "Choose a step to mock...",
    );
  });

  it("should call saveMockOption when select item is clicked", async () => {
    mockPostData.mockResolvedValue({
      data: { serverOptions: mockServerOptions },
    });

    renderComponent();

    const selectItems = screen.getAllByTestId("select-item");

    fireEvent.click(selectItems[0]);

    await waitFor(() => {
      expect(mockPostData).toHaveBeenCalledWith(mockMockOptions[0]);
    });
  });

  it("should update server options after selecting a mock option", async () => {
    mockPostData.mockResolvedValue({
      data: { serverOptions: mockServerOptions },
    });

    renderComponent();

    const selectItems = screen.getAllByTestId("select-item");

    fireEvent.click(selectItems[0]);

    await waitFor(() => {
      expect(screen.getByTestId("radio-group")).toBeInTheDocument();
      expect(screen.getAllByTestId("radio")).toHaveLength(2);
    });
  });

  it("should call onSelectedMockOption when a mock option is selected", async () => {
    mockPostData.mockResolvedValue({
      data: { serverOptions: mockServerOptions },
    });

    renderComponent();

    const selectItems = screen.getAllByTestId("select-item");

    fireEvent.click(selectItems[0]);

    await waitFor(() => {
      expect(mockOnSelectedMockOption).toHaveBeenCalledWith(mockMockOptions[0]);
    });
  });

  it("should show loading state when loading and no mock options", () => {
    mockUseMockApi.mockReturnValue({
      postData: mockPostData,
      mockOptions: [],
      loading: true,
    });

    renderComponent();

    const select = screen.getByTestId("select");

    expect(select).toHaveAttribute("data-isloading", "true");
  });

  it("should show skeletons when loading and mock options exist", () => {
    mockUseMockApi.mockReturnValue({
      postData: mockPostData,
      mockOptions: mockMockOptions,
      loading: true,
    });

    renderComponent();

    expect(screen.getByTestId("select")).toHaveAttribute(
      "data-isloading",
      "false",
    );
    expect(screen.getAllByTestId("skeleton")).toHaveLength(3); // 1 circle + 2 bars
  });

  it("should show empty state when no server options", () => {
    renderComponent();

    expect(screen.getByTestId("git-commit-icon")).toBeInTheDocument();
    expect(
      screen.getByText("Choose a step to see saved mocked responses."),
    ).toBeInTheDocument();
  });

  it("should show radio group when server options exist", async () => {
    mockPostData.mockResolvedValue({
      data: { serverOptions: mockServerOptions },
    });

    renderComponent();

    const selectItems = screen.getAllByTestId("select-item");

    fireEvent.click(selectItems[0]);

    await waitFor(() => {
      const radioGroup = screen.getByTestId("radio-group");

      expect(radioGroup).toHaveAttribute("data-required", "true");

      const radios = screen.getAllByTestId("radio");

      expect(radios[0]).toHaveAttribute("data-value", "Mocked response #1");
      expect(radios[1]).toHaveAttribute("data-value", "Mocked response #2");
    });
  });

  it("should handle postData errors gracefully", async () => {
    mockPostData.mockRejectedValue(new Error("API Error"));

    renderComponent();

    const selectItems = screen.getAllByTestId("select-item");

    fireEvent.click(selectItems[0]);

    // Should not break, just not update server options
    await waitFor(() => {
      expect(screen.getByTestId("git-commit-icon")).toBeInTheDocument();
    });
  });

  it("should apply correct CSS classes", () => {
    renderComponent();

    const select = screen.getByTestId("select");
    const classNames = JSON.parse(
      select.getAttribute("data-classnames") || "{}",
    );

    expect(classNames.trigger).toBe("bg-white");
  });

  it("should render with proper structure and classes", () => {
    const { container } = renderComponent();

    expect(
      container.querySelector(".flex.flex-col.w-full.justify-center"),
    ).toBeInTheDocument();
    expect(container.querySelector(".py-2")).toBeInTheDocument();
    expect(container.querySelector(".flex.flex-wrap")).toBeInTheDocument();
  });

  describe("Radio options content", () => {
    it("should display radio options with correct labels and descriptions", async () => {
      mockPostData.mockResolvedValue({
        data: { serverOptions: mockServerOptions },
      });

      renderComponent();

      const selectItems = screen.getAllByTestId("select-item");

      fireEvent.click(selectItems[0]);

      await waitFor(() => {
        const radios = screen.getAllByTestId("radio");

        expect(radios[0]).toHaveTextContent("Mocked response #1");
        expect(radios[0]).toHaveAttribute(
          "data-description",
          expect.stringContaining("2024"),
        );

        expect(radios[1]).toHaveTextContent("Mocked response #2");
        expect(radios[1]).toHaveAttribute(
          "data-description",
          expect.stringContaining("2024"),
        );
      });
    });
  });

  describe("Edge cases", () => {
    it("should handle empty mockOptions array", () => {
      mockUseMockApi.mockReturnValue({
        postData: mockPostData,
        mockOptions: [],
        loading: false,
      });

      renderComponent();

      expect(screen.queryAllByTestId("select-item")).toHaveLength(0);
      expect(screen.getByTestId("git-commit-icon")).toBeInTheDocument();
    });

    it("should handle undefined serverOptions", async () => {
      mockPostData.mockResolvedValue({
        data: { serverOptions: undefined }, // Edge case
      });

      renderComponent();

      const selectItems = screen.getAllByTestId("select-item");

      fireEvent.click(selectItems[0]);

      await waitFor(() => {
        expect(screen.getByTestId("git-commit-icon")).toBeInTheDocument();
      });
    });
  });
});
