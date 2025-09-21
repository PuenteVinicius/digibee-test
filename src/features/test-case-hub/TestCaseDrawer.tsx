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
    <>
      {currentLevel === CreateLevels.MAIN && (
        <Drawer
          isOpen={isOpen}
          title={levels[currentLevel].title}
          description={levels[currentLevel].description}
          mainStep={currentLevel === CreateLevels.MAIN}
          leftIcon={<Xmark fontSize={16} />}
          rightIcon={<Book fontSize={13} />}
          onLeftButtonClick={killDrawer}
          onRightButtonClick={() => navigateTo(CreateLevels.MAIN)}
          onCancelButtonClick={() => killDrawer()}
          onApply={() => updateMockedOptions()}
          onSave={() => onSave()}
        >
          <MainLevel
            onLevelSelect={(selectedLevel) => navigateTo(selectedLevel)}
            selectedMockOptions={selectedMockOptions}
          />
        </Drawer>
      )}
      {currentLevel === CreateLevels.MOCK_CONFIGURATION && (
        <Drawer
          isOpen={isOpen}
          title={levels[currentLevel].title}
          description={levels[currentLevel].description}
          mainStep={false}
          leftIcon={<ArrowLeft fontSize={13} />}
          rightIcon={<Book fontSize={13} />}
          onLeftButtonClick={goBack}
          onRightButtonClick={() => navigateTo(CreateLevels.MAIN)}
          onCancelButtonClick={() => killDrawer()}
          onApply={() => updateMockedOptions()}
          onSave={() => onSave()}
        >
          <MockConfigurationLevel
            onSelectedMockOption={(selectedMockOption) =>
              setNewSelectedMockOption(selectedMockOption)
            }
          />
        </Drawer>
      )}
    </>
  );
};

export default TestCaseDrawer;
