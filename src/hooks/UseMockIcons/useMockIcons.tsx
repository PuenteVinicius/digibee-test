import { ReactElement } from "react";

import JoltIcon from "../../assets/pipeline-step-jolt.svg?react";
import RestIcon from "../../assets/pipeline-step-rest.svg?react";
import SessionManagementIcon from "../../assets/pipeline-step-session-management.svg?react";

export type MockIcon = "JOLT" | "REST" | "SESSION_MANAGEMENT";

const mockIcons = {
  JOLT: <JoltIcon />,
  REST: <RestIcon />,
  SESSION_MANAGEMENT: <SessionManagementIcon />,
};

export const useMockIcons = () => {
  const getIcon = (mockType: MockIcon): ReactElement => mockIcons[mockType];

  return {
    getIcon,
  };
};

export default useMockIcons;
