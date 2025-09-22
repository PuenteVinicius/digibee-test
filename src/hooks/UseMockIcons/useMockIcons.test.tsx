import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { ReactElement } from "react";

import useMockIcons, { MockIcon } from "./useMockIcons";

// Mock the SVG imports
vi.mock("../../assets/pipeline-step-jolt.svg?react", () => ({
  default: vi.fn(() => <svg data-testid="jolt-icon">Jolt Icon</svg>),
}));

vi.mock("../../assets/pipeline-step-rest.svg?react", () => ({
  default: vi.fn(() => <svg data-testid="rest-icon">Rest Icon</svg>),
}));

vi.mock("../../assets/pipeline-step-session-management.svg?react", () => ({
  default: vi.fn(() => (
    <svg data-testid="session-management-icon">Session Management Icon</svg>
  )),
}));

describe("useMockIcons", () => {
  it("should return the correct JOLT icon", () => {
    const { result } = renderHook(() => useMockIcons());

    const icon: ReactElement = result.current.getIcon("JOLT");

    expect(icon).toBeDefined();
  });

  it("should return the correct REST icon", () => {
    const { result } = renderHook(() => useMockIcons());

    const icon: ReactElement = result.current.getIcon("REST");

    expect(icon).toBeDefined();
  });

  it("should return the correct SESSION_MANAGEMENT icon", () => {
    const { result } = renderHook(() => useMockIcons());

    const icon: ReactElement = result.current.getIcon("SESSION_MANAGEMENT");

    expect(icon).toBeDefined();
  });

  it("should return the same icon instance for the same mock type", () => {
    const { result } = renderHook(() => useMockIcons());

    const firstCall: ReactElement = result.current.getIcon("JOLT");
    const secondCall: ReactElement = result.current.getIcon("JOLT");

    // They should be the same object reference (memoized)
    expect(firstCall).toBe(secondCall);
  });

  it("should have all mock icon types defined", () => {
    const { result } = renderHook(() => useMockIcons());

    const mockTypes: MockIcon[] = ["JOLT", "REST", "SESSION_MANAGEMENT"];

    mockTypes.forEach((type) => {
      const icon = result.current.getIcon(type);

      expect(icon).toBeDefined();
    });
  });

  it("should return an object with getIcon function", () => {
    const { result } = renderHook(() => useMockIcons());

    expect(result.current).toHaveProperty("getIcon");
    expect(typeof result.current.getIcon).toBe("function");
  });

  it("should handle all exported MockIcon types", () => {
    // Test that the type definition matches the implementation
    const mockIconValues: MockIcon[] = ["JOLT", "REST", "SESSION_MANAGEMENT"];

    const { result } = renderHook(() => useMockIcons());

    mockIconValues.forEach((type) => {
      expect(() => result.current.getIcon(type)).not.toThrow();
    });
  });
});

// Additional tests for edge cases and TypeScript compatibility
describe("useMockIcons TypeScript compatibility", () => {
  it("should only accept valid MockIcon types", () => {
    // This test is more about TypeScript compilation than runtime
    // If you try to pass an invalid type, TypeScript should catch it
    const { result } = renderHook(() => useMockIcons());

    // These should all work without TypeScript errors
    const validTypes: MockIcon[] = ["JOLT", "REST", "SESSION_MANAGEMENT"];

    validTypes.forEach((type) => {
      const icon = result.current.getIcon(type);

      expect(icon).toBeDefined();
    });
  });
});
