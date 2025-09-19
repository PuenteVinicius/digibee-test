import Drawer from "@/components/shared/Drawer/Drawer";
import { CreateLevels, levels } from "./hooks/levelManager/types";
import useLevelManager from "./hooks/levelManager/useLevelManager";
import MainLevel from "./components/levels/MainLevel/MainLevel";
import { ArrowLeft, Book } from "iconoir-react";
import { Xmark } from "iconoir-react";
import MockConfigurationLevel from "./components/levels/MockConfigurationLevel/MockConfigurationLevel";

export interface DrawerProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const TestCaseDrawer = ({ isOpen, onCloseDrawer }: DrawerProps) => {
  const { currentLevel, navigateTo, goBack } = useLevelManager({
    initialLevel: CreateLevels.MAIN,
  });

  return (
    <Drawer
      isOpen={isOpen}
      title={levels[currentLevel].title}
      description={levels[currentLevel].description}
      mainStep={currentLevel === CreateLevels.MAIN}
      leftIcon={currentLevel === CreateLevels.MAIN ? <Xmark /> : <ArrowLeft />}
      rightIcon={<Book />}
      onCloseDrawer={currentLevel === CreateLevels.MAIN ? onCloseDrawer : goBack}
    >
      <>
        {currentLevel === CreateLevels.MAIN && (
          <MainLevel
            onLevelSelect={(selectedLevel) => navigateTo(selectedLevel)}
          />
        )}
        {currentLevel === CreateLevels.MOCK_CONFIGURATION && (
          <MockConfigurationLevel onClose={() => goBack()} />
        )}
      </>
    </Drawer>
  );
};

export default TestCaseDrawer;
