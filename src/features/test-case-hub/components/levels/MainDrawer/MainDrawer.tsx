import { Button } from "@heroui/button";
import { DrawerBody, DrawerFooter } from "@heroui/drawer";
import { Book, Xmark } from "iconoir-react";

import MainLevel from "@/features/test-case-hub/components/levels/MainDrawer/components/MainLevel/MainLevel";
import { MockOption } from "@/types";
import {
  CreateLevels,
  levels,
} from "@/features/test-case-hub/hooks/levelManager/types";
import Drawer from "@/components/shared/Drawer/Drawer";

export interface MainDrawerProps {
  isOpen: boolean;
  mockOptions: MockOption[];
  onCancelButtonClick: () => void;
  onSave: () => void;
  navigateTo: (level: CreateLevels) => void;
  goBack: () => void;
}

const MainDrawer = ({
  isOpen,
  mockOptions,
  navigateTo,
  onCancelButtonClick,
  onSave,
  goBack,
}: MainDrawerProps) => {
  return (
    <Drawer
      description={levels[CreateLevels.MAIN].description}
      isOpen={isOpen}
      leftIcon={<Xmark fontSize={16} />}
      rightIcon={<Book fontSize={13} />}
      title={levels[CreateLevels.MAIN].title}
      onLeftButtonClick={() => goBack()}
      onRightButtonClick={() => {}}
    >
      <>
        <DrawerBody className="py-0 gap-0 px-0">
          <MainLevel
            mockOptions={mockOptions}
            onLevelSelect={(selectedLevel) => navigateTo(selectedLevel)}
          />
        </DrawerBody>
        <DrawerFooter className="flex w-full justify-between">
          <Button
            className="font-semibold"
            color="primary"
            variant="light"
            onPress={onCancelButtonClick}
          >
            Cancel
          </Button>
          <Button
            className="border-x font-semibold"
            color="primary"
            isDisabled={mockOptions.length === 0}
            variant="bordered"
            onPress={onSave}
          >
            Save
          </Button>
        </DrawerFooter>
      </>
    </Drawer>
  );
};

export default MainDrawer;
