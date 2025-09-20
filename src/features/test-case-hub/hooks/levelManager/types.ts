export interface Level {
  title: string;
  description: string;
}

export enum CreateLevels {
  MAIN,
  MOCK_CONFIGURATION,
}

export const levels: { [key in number]: Level } = {
  [CreateLevels.MAIN]: {
    title: "Create a test case",
    description: "Define your coverage area and use tools to simulate the desired paths."
  },
  [CreateLevels.MOCK_CONFIGURATION]: {
    title: "Mock Response",
    description: "You can choose a connector to simulate the response.",
  },
};

export const getLevels = () => [
  levels[CreateLevels.MAIN],
  levels[CreateLevels.MOCK_CONFIGURATION],
];
