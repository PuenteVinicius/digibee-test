import { Button } from "@heroui/button";

import {
  Drawer as HeroUiDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { ReactElement } from "react";

export interface DrawerProps {
  isOpen: boolean;
  title: string;
  closeIcon?: ReactElement;
  rightIcon?: ReactElement;
  children: ReactElement;
  lastStep: boolean;
  onCloseDrawer: () => void;
}

const Drawer = ({
  isOpen,
  onCloseDrawer,
  title,
  closeIcon,
  rightIcon,
  children,
  lastStep,
}: DrawerProps) => {
  return (
    <HeroUiDrawer
      isOpen={isOpen}
      radius="none"
      backdrop="transparent"
      onOpenChange={onCloseDrawer}
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          {closeIcon && <></>}
          {title}
          {rightIcon && <></>}
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter>
          {lastStep ? (
            <>
              <Button color="danger" variant="flat" onPress={onCloseDrawer}>
                Close
              </Button>
              <Button color="primary" onPress={onCloseDrawer}>
                Sign in
              </Button>
            </>
          ) : (
            <Button color="danger" variant="flat" onPress={onCloseDrawer}>
              Apply
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </HeroUiDrawer>
  );
};

export default Drawer;
