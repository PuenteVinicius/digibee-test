import {
  Drawer as HeroUiDrawer,
  DrawerContent,
  DrawerHeader,
} from "@heroui/drawer";
import { ReactElement } from "react";

export interface DrawerProps {
  isOpen: boolean;
  title: string;
  description?: string;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  children: ReactElement;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
}

const Drawer = ({
  isOpen,
  leftIcon,
  rightIcon,
  description,
  title,
  children,
  onLeftButtonClick,
  onRightButtonClick,
}: DrawerProps) => {
  return (
    <HeroUiDrawer
      isOpen={isOpen}
      radius="none"
      backdrop="transparent"
      hideCloseButton
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-0 pb-0">
          <div className="flex w-full justify-between items-end mt-4">
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
            <h1 className="mt-6 text-[22px] font-[700]">{title}</h1>
            {description && (
              <p className="mt-2 font-[400] tracking-wide text-sm text-gray-500 leading-5">
                {description}
              </p>
            )}
          </div>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </HeroUiDrawer>
  );
};

export default Drawer;
