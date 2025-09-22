import { CreateLevels } from "./hooks/levelManager/types";
import useLevelManager from "./hooks/levelManager/useLevelManager";
import { useState } from "react";
import { addToast } from "@heroui/react";
import { MockOption } from "@/types";
import MockConfigurationDrawer from "./components/levels/MockConfigurationDrawer/MockConfigurationDrawer";
import MainDrawer from "./components/levels/MainDrawer/MainDrawer";

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
      }
    }
  };

  const callSuccsessToast = () => {
    addToast({
      description: "Your test has been created successfully.",
      color: "success",
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
          isOpen={isOpen}
          mockOptions={mockOptions}
          onCancelButtonClick={() => closeDrawer()}
          onSave={() => saveMockTest()}
          navigateTo={(selectedLevel) => navigateTo(selectedLevel)}
          goBack={() => onCloseDrawer()}
        />
      )}
      {currentLevel === CreateLevels.MOCK_CONFIGURATION && (
        <MockConfigurationDrawer
          isOpen={isOpen}
          onApply={(selectedMock) => updateMockedOptions(selectedMock)}
          goBack={() => goBack()}
          navigateTo={(selectedLevel) => navigateTo(selectedLevel)}
        />
      )}
    </>
  );
};

export default TestCaseDrawer;
