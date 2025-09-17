import Drawer from "@/components/shared/Drawer/Drawer";
import { CreateLevels, levels } from "./hooks/levelManager/types";
import useLevelManager from "./hooks/levelManager/useLevelManager";
import { MainLevel } from "./components/levels/MainLevel/MainLevel";
import { MockConfigurationLevel } from "./components/levels/MockConfigurationLevel/MockConfigurationLevel";

export interface DrawerProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const TestCaseDrawer = ({ isOpen, onCloseDrawer }: DrawerProps) => {

  const { currentLevel, navigateTo, goBack } = useLevelManager({initialLevel: CreateLevels.MAIN});

  return (
    <Drawer
      isOpen={isOpen}
      title={levels[currentLevel].title}
      lastStep={false}
      closeIcon={<></>}
      rightIcon={<></>}
      onCloseDrawer={onCloseDrawer}
    >
      <>
      {currentLevel === CreateLevels.MAIN && <MainLevel onNavigateToMockConfig={() => navigateTo(1)} />}
      {currentLevel === CreateLevels.MOCK_CONFIGURATION && <MockConfigurationLevel onClose={() => goBack()} />}
      </>
    </Drawer>
  );
};

export default TestCaseDrawer;