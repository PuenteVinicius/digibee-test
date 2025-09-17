export interface Level {
  title: string;
}

export enum CreateLevels {
  MAIN,
  MOCK_CONFIGURATION,
}

export const levels: { [key in number]: Level } = {
  [CreateLevels.MAIN]: {
    title: "Novo colaborador",
  },
  [CreateLevels.MOCK_CONFIGURATION]: {
    title: "Novo colaborador",
  },
};

export const getLevels = () => [
  levels[CreateLevels.MAIN],
  levels[CreateLevels.MOCK_CONFIGURATION],
];
