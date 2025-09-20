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
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
  onCancelButtonClick: () => void;
  onSave: () => void;
  onApply: () => void;
}

const Drawer = ({
  isOpen,
  title,
  description,
  leftIcon,
  rightIcon,
  children,
  mainStep,
  onLeftButtonClick,
  onRightButtonClick,
  onCancelButtonClick,
  onSave,
  onApply,
}: DrawerProps) => {
  return (
    <HeroUiDrawer
      isOpen={isOpen}
      radius="none"
      backdrop="transparent"
      hideCloseButton
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          <div className="flex w-full justify-between items-end pt-2">
            {leftIcon && (
              <div
                onClick={() => onLeftButtonClick()}
                className="cursor-pointer"
              >
                {leftIcon}
              </div>
            )}
            {rightIcon && (
              <div
                onClick={() => onRightButtonClick()}
                className="cursor-pointer"
              >
                {rightIcon}
              </div>
            )}
          </div>
          <div className="w-full">
            <h1 className="mt-4 text-[22px] font-[700]">{title}</h1>
            {description && (
              <p className="mt-2 font-[400] tracking-wide text-sm text-gray-500 leading-5">
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
                variant="bordered"
                onPress={onSave}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              className="w-full"
              color="primary"
              variant="bordered"
              onPress={onApply}
            >
              Apply
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </HeroUiDrawer>
  );
};

export default Drawer;
