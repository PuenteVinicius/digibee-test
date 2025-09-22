import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

import { useMockApi } from "./useMockApi";

import { MOCK_OPTIONS, SERVER_OPTIONS } from "@/constants";
import { MockOption } from "@/types";

// Mock the constants
vi.mock("@/constants", () => ({
  MOCK_OPTIONS: [
    { id: "1", name: "Mock Option 1" },
    { id: "2", name: "Mock Option 2" },
  ],
  SERVER_OPTIONS: [
    { id: "server-1", name: "Server Option 1" },
    { id: "server-2", name: "Server Option 2" },
  ],
}));

describe("useMockApi", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with correct default values", () => {
    const { result } = renderHook(() => useMockApi());

    expect(result.current.loading).toBe(true); // Should be true due to useEffect
    expect(result.current.error).toBeNull();
    expect(result.current.mockOptions).toEqual([]);
  });

  it("should fetch mock options successfully", async () => {
    const { result } = renderHook(() => useMockApi());

    // Fast-forward timers to resolve the setTimeout
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
    });
  });

  it("should handle fetch error when Math.random() returns low value", async () => {
    // Force Math.random to return a value less than 0.1 to trigger error
    const mockMath = Object.create(global.Math);

    mockMath.random = () => 0.05;
    global.Math = mockMath;

    const { result } = renderHook(() => useMockApi());

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Error on retrieve data");
      expect(result.current.mockOptions).toEqual([]);
    });
  });

  it("should call fetchMockOptions and return mock options", async () => {
    const { result } = renderHook(() => useMockApi());

    // Wait for initial fetch to complete
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Reset loading state
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Test refetch function
    await act(async () => {
      const promise = result.current.fetchMockOptions();

      vi.advanceTimersByTime(1000);
      await promise;
    });

    await waitFor(() => {
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should handle error in fetchMockOptions", async () => {
    const mockMath = Object.create(global.Math);

    mockMath.random = () => 0.05;
    global.Math = mockMath;

    const { result } = renderHook(() => useMockApi());

    await act(async () => {
      try {
        await result.current.fetchMockOptions();
      } catch (error) {
        // Expected to throw error
      }
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.error).toBe("Error on retrieve data");
      expect(result.current.loading).toBe(false);
    });
  });

  it("should post data successfully", async () => {
    const testData: MockOption = {
      id: "test-1",
      label: "Test Data",
      key: "JOLT",
    };
    const { result } = renderHook(() => useMockApi());

    let response: any;

    await act(async () => {
      response = await result.current.postData(testData);
      vi.advanceTimersByTime(1500);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(response).toEqual({
        success: true,
        message: "success on sending data",
        data: {
          ...testData,
          serverOptions: SERVER_OPTIONS,
          createdAt: expect.any(String),
        },
      });
    });
  });

  it("should handle post data error when Math.random() returns low value", async () => {
    const mockMath = Object.create(global.Math);

    mockMath.random = () => 0.1; // Less than 0.2 to trigger error
    global.Math = mockMath;

    const testData: MockOption = {
      id: "test-1",
      label: "Test Data",
      key: "REST",
    };
    const { result } = renderHook(() => useMockApi());

    let response: any;

    await act(async () => {
      response = await result.current.postData(testData);
      vi.advanceTimersByTime(1500);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Error on send data");
      expect(response).toEqual({
        success: false,
        message: "Error on send data",
      });
    });
  });

  it("should handle unknown error in postData", async () => {
    // Mock a different type of error
    vi.spyOn(global, "setTimeout").mockImplementationOnce(() => {
      throw "Non-Error object";
    });

    const testData: MockOption = {
      id: "test-1",
      label: "Test Data",
      key: "SESSION_MANAGEMENT",
    };
    const { result } = renderHook(() => useMockApi());

    let response: any;

    await act(async () => {
      response = await result.current.postData(testData);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("Unknow error");
      expect(response).toEqual({
        success: false,
        message: "Unknow error",
      });
    });
  });

  it("should refetch options using refetchOptions function", async () => {
    const { result } = renderHook(() => useMockApi());

    // Wait for initial fetch
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Test refetch
    await act(async () => {
      const promise = result.current.refetchOptions();

      vi.advanceTimersByTime(1000);
      await promise;
    });

    await waitFor(() => {
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
      expect(result.current.loading).toBe(false);
    });
  });

  it("should set loading state correctly during operations", async () => {
    const { result } = renderHook(() => useMockApi());

    // Initial loading from useEffect
    expect(result.current.loading).toBe(true);

    // Complete initial fetch
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Test loading during postData
    await act(async () => {
      const postPromise = result.current.postData({
        id: "test",
        label: "test",
        key: "REST",
      });

      expect(result.current.loading).toBe(true);
      vi.advanceTimersByTime(1500);
      await postPromise;
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
  });
});
