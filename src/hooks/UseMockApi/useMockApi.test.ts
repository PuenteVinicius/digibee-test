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

    expect(result.current.error).toBeNull();
    expect(result.current.mockOptions).toEqual([
      { id: "1", name: "Mock Option 1" },
      { id: "2", name: "Mock Option 2" },
    ]);
  });

  it("should fetch mock options successfully", () => {
    const { result } = renderHook(() => useMockApi());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
  });

  it("should call fetchMockOptions and return mock options", () => {
    const { result } = renderHook(() => useMockApi());

    waitFor(() => {
      expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
      expect(result.current.loading).toBe(false);
    });
  });

 
  it("should refetch options using refetchOptions function", () => {
    const { result } = renderHook(() => useMockApi());

    expect(result.current.loading).toBe(false);

    // Test refetch
    act(async () => {
      const promise = result.current.refetchOptions();

      await promise;
    });

    expect(result.current.mockOptions).toEqual(MOCK_OPTIONS);
    expect(result.current.loading).toBe(false);
  });

});
