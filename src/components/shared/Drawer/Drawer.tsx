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
  description?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  children: ReactElement;
  mainStep: boolean;
  onCloseDrawer: () => void;
}

const Drawer = ({
  isOpen,
  onCloseDrawer,
  title,
  leftIcon,
  rightIcon,
  children,
  mainStep,
  description,
}: DrawerProps) => {
  return (
    <HeroUiDrawer
      isOpen={isOpen}
      radius="none"
      backdrop="transparent"
      onOpenChange={onCloseDrawer}
      hideCloseButton
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          <div className="flex w-full justify-between pt-2">
            {leftIcon && <div>{leftIcon}</div>}
            {rightIcon && <div>{rightIcon}</div>}
          </div>
          <div className="w-full">
            <h1 className="mt-4 text-2xl font-semibold">{title}</h1>
            {description && (
              <p className="mt-2 font-light text-sm text-gray-500 leading-5">
                {description}
              </p>
            )}
          </div>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter className="flex w-full justify-between">
          {mainStep ? (
            <>
              <Button
                color="primary"
                variant="light"
                onPress={onCloseDrawer}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="bordered"
                onPress={onCloseDrawer}
              >
                Save
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
