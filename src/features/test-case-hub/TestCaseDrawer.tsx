import Drawer from "@/components/shared/Drawer/Drawer";
import { CreateLevels, levels } from "./hooks/levelManager/types";
import useLevelManager from "./hooks/levelManager/useLevelManager";
import { MockConfigurationLevel } from "./components/levels/MockConfigurationLevel/MockConfigurationLevel";
import MainLevel from "./components/levels/MainLevel/MainLevel";
import { ArrowLeft, Book } from "iconoir-react";
import { Xmark } from "iconoir-react";

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
      onCloseDrawer={onCloseDrawer}
    >
      <>
        {currentLevel === CreateLevels.MAIN && (
          <MainLevel onNavigateToMockConfig={() => navigateTo(CreateLevels.MOCK_CONFIGURATION)} />
        )}
        {currentLevel === CreateLevels.MOCK_CONFIGURATION && (
          <MockConfigurationLevel onClose={() => goBack()} />
        )}
      </>
    </Drawer>
  );
};

export default TestCaseDrawer;
