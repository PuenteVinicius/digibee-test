import { Button } from "@heroui/button";
import { DrawerBody, DrawerFooter } from "@heroui/drawer";
import { ArrowLeft, Book } from "iconoir-react";
import { useState } from "react";

import {
  CreateLevels,
  levels,
} from "@/features/test-case-hub/hooks/levelManager/types";
import MockConfigurationLevel from "@/features/test-case-hub/components/levels/MockConfigurationDrawer/components/MockConfigurationLevel/MockConfigurationLevel";
import { MockOption } from "@/types";
import Drawer from "@/components/shared/Drawer/Drawer";

export interface MockConfigurationDrawerProps {
  isOpen: boolean;
  onApply: (selectedMockOption?: MockOption) => void;
  navigateTo: (level: CreateLevels) => void;
  goBack: () => void;
}

const MockConfigurationDrawer = ({
  isOpen,
  onApply,
  navigateTo,
  goBack,
}: MockConfigurationDrawerProps) => {
  const [selectedMock, setSelectedMock] = useState<MockOption>();

  return (
    <Drawer
      description={levels[CreateLevels.MOCK_CONFIGURATION].description}
      isOpen={isOpen}
      leftIcon={<ArrowLeft fontSize={13} />}
      rightIcon={<Book fontSize={13} />}
      title={levels[CreateLevels.MOCK_CONFIGURATION].title}
      onLeftButtonClick={() => goBack()}
      onRightButtonClick={() => navigateTo(CreateLevels.MAIN)}
    >
      <>
        <DrawerBody className="py-0 gap-0 px-0">
          <MockConfigurationLevel
            onSelectedMockOption={(selectedMockOption) => {
              setSelectedMock(selectedMockOption);
            }}
          />
        </DrawerBody>
        <DrawerFooter className="flex w-full justify-between">
          <Button
            className="w-full"
            color="primary"
            isDisabled={!selectedMock}
            variant="bordered"
            onPress={() => onApply(selectedMock)}
          >
            Apply
          </Button>
        </DrawerFooter>
      </>
    </Drawer>
  );
};

export default MockConfigurationDrawer;
