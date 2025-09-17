import Drawer from "@/components/shared/Drawer/Drawer";
import { MockConfiguration } from "./components/steps/MockConfiguration/MockConfiguration";
import { TestCaseHub } from "./components/steps/TestCaseDrawer/TestCaseDrawer";
import { useDrawerNavigation } from "./hooks/stepManager/useDrawerNavigation";
import { ReactElement, useState } from "react";

export interface DrawerProps {
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const TestCaseDrawer = ({ isOpen, onCloseDrawer }: DrawerProps) => {
  const [rightIcon, setRightIcon] = useState<ReactElement>();
  const [leftIcon, setLeftIcon] = useState<ReactElement>();

  const { currentLevel, navigateTo, goBack } = useDrawerNavigation();

  const renderLevel = () => {
    switch (currentLevel) {
      case 0:
        return <TestCaseHub onNavigateToMockConfig={() => navigateTo(1)} />;
      case 1:
        return <MockConfiguration onClose={goBack} />;
      default:
        return <TestCaseHub onNavigateToMockConfig={() => navigateTo(1)} />;
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      title=""
      lastStep={false}
      closeIcon={rightIcon}
      rightIcon={leftIcon}
      onCloseDrawer={onCloseDrawer}
    >
      {renderLevel()}
    </Drawer>
  );
};

export default TestCaseDrawer;
