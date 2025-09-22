import { useState } from "react";
import { addToast } from "@heroui/react";

import useLevelManager from "./hooks/levelManager/useLevelManager";
import { CreateLevels } from "./hooks/levelManager/types";
import MockConfigurationDrawer from "./components/levels/MockConfigurationDrawer/MockConfigurationDrawer";
import MainDrawer from "./components/levels/MainDrawer/MainDrawer";

import { MockOption } from "@/types";

export interface DrawerProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const TestCaseDrawer = ({ isOpen, onCloseDrawer }: DrawerProps) => {
  const [mockOptions, setMockOptions] = useState<MockOption[]>([]);

  const { currentLevel, navigateTo, goBack } = useLevelManager({
    initialLevel: CreateLevels.MAIN,
  });

  const updateMockedOptions = (mockOption?: MockOption) => {
    if (mockOption) {
      const currentMockOptions: MockOption[] = mockOptions;

      if (!currentMockOptions.find((item) => item.id === mockOption.id)) {
        currentMockOptions.push(mockOption);
        setMockOptions(currentMockOptions);
        goBack();

        return;
      }
      callWarningToast();
    }
  };

  const callSuccsessToast = () => {
    addToast({
      description: "Your test has been created successfully.",
      color: "success",
    });
  };

  const callWarningToast = () => {
    addToast({
      description: "the test is already selected",
      color: "warning",
    });
  };

  const saveMockTest = () => {
    callSuccsessToast();
    closeDrawer();
  };

  const closeDrawer = () => {
    setMockOptions([]);
    onCloseDrawer();
  };

  return (
    <>
      {currentLevel === CreateLevels.MAIN && (
        <MainDrawer
          goBack={() => onCloseDrawer()}
          isOpen={isOpen}
          mockOptions={mockOptions}
          navigateTo={(selectedLevel) => navigateTo(selectedLevel)}
          onCancelButtonClick={() => closeDrawer()}
          onSave={() => saveMockTest()}
        />
      )}
      {currentLevel === CreateLevels.MOCK_CONFIGURATION && (
        <MockConfigurationDrawer
          goBack={() => goBack()}
          isOpen={isOpen}
          navigateTo={(selectedLevel) => navigateTo(selectedLevel)}
          onApply={(selectedMock) => updateMockedOptions(selectedMock)}
        />
      )}
    </>
  );
};

export default TestCaseDrawer;
