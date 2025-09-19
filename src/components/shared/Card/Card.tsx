import { CardBody, Card as HeroUiCard } from "@heroui/card";
import { Plus } from "iconoir-react";

export interface DrawerProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const Card = ({ title, description, onClick = () => {} }: DrawerProps) => {
  return (
    <HeroUiCard
      shadow="none"
      onClick={() => onClick()}
      className="w-full border border-gray-200"
    >
      <CardBody className="pt-0 pb-2 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div className="flex pt-2 pb-1">
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <p className="font-light text-sm text-gray-500 leading-5">
            {description}
          </p>
        </div>
        <div className="p-1 cursor-pointer" onClick={() => onClick()}>
          <Plus />
        </div>
      </CardBody>
    </HeroUiCard>
  );
};

export default Card;
