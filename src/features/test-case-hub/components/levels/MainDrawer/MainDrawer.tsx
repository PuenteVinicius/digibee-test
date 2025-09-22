import { Button } from "@heroui/button";
import { DrawerBody, DrawerFooter } from "@heroui/drawer";
import MainLevel from "@/components/MainLevel/MainLevel";
import { MockOption } from "@/types";
import {
  CreateLevels,
  levels,
} from "@/features/test-case-hub/hooks/levelManager/types";
import { Book, Xmark } from "iconoir-react";
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
      isOpen={isOpen}
      leftIcon={<Xmark fontSize={16} />}
      rightIcon={<Book fontSize={13} />}
      title={levels[CreateLevels.MAIN].title}
      description={levels[CreateLevels.MAIN].description}
      onLeftButtonClick={() => goBack()}
      onRightButtonClick={() => {}}
    >
      <>
        <DrawerBody className="py-0 gap-0 px-0">
          <MainLevel
            onLevelSelect={(selectedLevel) => navigateTo(selectedLevel)}
            mockOptions={mockOptions}
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
            isDisabled={mockOptions.length === 0}
            className="border-x font-semibold"
            color="primary"
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
