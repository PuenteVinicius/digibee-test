export default interface Mock {
  id: string;
  name: string;
  svgPath: string;
}

export const INITIAL_MOCKS: Mock[] = [
  { id: "1", name: "Session Management", svgPath: "HTTP" },
  { id: "2", name: "Rest V2 (HTTP / APIs)", svgPath: "DB" },
  { id: "3", name: "Session Management", svgPath: "FS" },
  { id: "4", name: "Transformer (JOLT)", svgPath: "FS" },
];
