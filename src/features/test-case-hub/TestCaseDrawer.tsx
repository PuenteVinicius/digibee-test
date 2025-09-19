import Drawer from "@/components/shared/Drawer/Drawer";
import { CreateLevels, levels } from "./hooks/levelManager/types";
import useLevelManager from "./hooks/levelManager/useLevelManager";
import MainLevel from "./components/levels/MainLevel/MainLevel";
import { ArrowLeft, Book } from "iconoir-react";
import { Xmark } from "iconoir-react";
import MockConfigurationLevel from "./components/levels/MockConfigurationLevel/MockConfigurationLevel";
import { useState } from "react";
import { MockOption } from "@/hooks/UseMockApi/useMockApi";

export interface DrawerProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const TestCaseDrawer = ({ isOpen, onCloseDrawer }: DrawerProps) => {
  const [selectedMockOptions, setSelectedMockOption] = useState<MockOption[]>(
    []
  );

  const { currentLevel, navigateTo, goBack } = useLevelManager({
    initialLevel: CreateLevels.MAIN,
  });

  const updateMockedOptions = (selectedMockOption: MockOption | undefined) => {
    if (selectedMockOption) {
      const currentMockOptions: MockOption[] = selectedMockOptions;
      currentMockOptions.push(selectedMockOption);
      setSelectedMockOption(currentMockOptions);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      title={levels[currentLevel].title}
      description={levels[currentLevel].description}
      mainStep={currentLevel === CreateLevels.MAIN}
      leftIcon={currentLevel === CreateLevels.MAIN ? <Xmark /> : <ArrowLeft />}
      rightIcon={<Book />}
      onCloseDrawer={
        currentLevel === CreateLevels.MAIN ? onCloseDrawer : goBack
      }
      onApply={() => goBack()}
      onSave={() => {}}
    >
      <>
        {currentLevel === CreateLevels.MAIN && (
          <MainLevel
            onLevelSelect={(selectedLevel) => navigateTo(selectedLevel)}
            selectedMockOptions={selectedMockOptions}
          />
        )}
        {currentLevel === CreateLevels.MOCK_CONFIGURATION && (
          <MockConfigurationLevel
            onSelectedMockOption={(
              selectedMockOption: MockOption | undefined
            ) => updateMockedOptions(selectedMockOption)}
          />
        )}
      </>
    </Drawer>
  );
};

export default TestCaseDrawer;
