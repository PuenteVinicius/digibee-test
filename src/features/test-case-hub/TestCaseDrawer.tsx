import Drawer from "@/components/shared/Drawer/Drawer";
import { CreateLevels, levels } from "./hooks/levelManager/types";
import useLevelManager from "./hooks/levelManager/useLevelManager";
import MainLevel from "./components/levels/MainLevel/MainLevel";
import { ArrowLeft, Book } from "iconoir-react";
import { Xmark } from "iconoir-react";
import MockConfigurationLevel from "./components/levels/MockConfigurationLevel/MockConfigurationLevel";
import { useState } from "react";
import { MockOption } from "@/hooks/UseMockApi/useMockApi";
import { addToast } from "@heroui/react";

export interface DrawerProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const TestCaseDrawer = ({ isOpen, onCloseDrawer }: DrawerProps) => {
  const [selectedMockOptions, setSelectedMockOptions] = useState<MockOption[]>(
    []
  );
  const [newSelectedMockOption, setNewSelectedMockOption] =
    useState<MockOption | null>();

  const { currentLevel, navigateTo, goBack } = useLevelManager({
    initialLevel: CreateLevels.MAIN,
  });

  const updateMockedOptions = () => {
    if (newSelectedMockOption) {
      const currentMockOptions: MockOption[] = selectedMockOptions;
      if (
        !currentMockOptions.find((item) => item.id === newSelectedMockOption.id)
      ) {
        currentMockOptions.push(newSelectedMockOption);
        setSelectedMockOptions(currentMockOptions);
        goBack();
      }
    }
  };

  const onSave = () => {
    addToast({
      description: "Your test has been created successfully.",
      color: "success",
    });
    killDrawer();
  };

  const killDrawer = () => {
    setSelectedMockOptions([]);
    setNewSelectedMockOption(null);
    onCloseDrawer();
  };

  return (
    <Drawer
      isOpen={isOpen}
      title={levels[currentLevel].title}
      description={levels[currentLevel].description}
      mainStep={currentLevel === CreateLevels.MAIN}
      leftIcon={
        currentLevel === CreateLevels.MAIN ? (
          <Xmark fontSize={16} />
        ) : (
          <ArrowLeft fontSize={16} />
        )
      }
      rightIcon={<Book fontSize={13} />}
      onLeftButtonClick={
        currentLevel === CreateLevels.MAIN ? killDrawer : goBack
      }
      onRightButtonClick={() => navigateTo(CreateLevels.MAIN)}
      onCancelButtonClick={() => killDrawer()}
      onApply={() => updateMockedOptions()}
      onSave={() => onSave()}
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
            onSelectedMockOption={(selectedMockOption) =>
              setNewSelectedMockOption(selectedMockOption)
            }
          />
        )}
      </>
    </Drawer>
  );
};

export default TestCaseDrawer;
