import { MockOption, ServerOption } from "@/types";

export const MOCK_OPTIONS: MockOption[] = [
  { id: "1", label: "Session Management", key: "SESSION_MANAGEMENT" },
  { id: "2", label: "Rest V2 (HTTP / APIs)", key: "REST" },
  { id: "3", label: "Session Management", key: "SESSION_MANAGEMENT" },
  { id: "4", label: "Transformer (JOLT)", key: "JOLT" },
];

export const SERVER_OPTIONS: ServerOption[] = [
  { id: "1", label: "Mocked response name #1", createdAt: new Date() },
  { id: "2", label: "Mocked response name #2", createdAt: new Date() },
];

export const TEST_GROUPS = [
  { key: "group-1", label: "Group 1" },
  { key: "group-2", label: "Group 2" },
  { key: "group-3", label: "Group 3" },
];
