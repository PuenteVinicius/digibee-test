export default interface Option {
  title: string;
  description: string;
}

export const PATH_OPTIONS: Option[] = [
  {
    title: "Set the start and end",
    description: "Choose the path to be tested",
  },
];
export const PATH_CONDITIONS: Option[] = [
  {
    title: "Payload",
    description: "Create or use a saved payload",
  },
  {
    title: "Mock Responses",
    description: "Create or use a saved mock",
  },
  {
    title: "Expect Results",
    description: "Configure assertions",
  },
];
