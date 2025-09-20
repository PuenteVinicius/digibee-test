import { CardBody, Card as HeroUiCard } from "@heroui/card";
import { Plus } from "iconoir-react";

export interface CardProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

const Card = ({ title, description, onClick = () => {} }: CardProps) => {
  return (
    <HeroUiCard
      shadow="none"
      onClick={() => onClick()}
      className="w-full border border-gray-200"
    >
      <CardBody className="py-3 pl-4 pr-5 flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <div className="flex p-0">
            <h3 className="text-sm font-medium tracking-[0.1px]">{title}</h3>
          </div>
          <p className="font-light text-sm text-gray-500 leading-5 p-0">
            {description}
          </p>
        </div>
        <div className="p-0 cursor-pointer" onClick={() => onClick()}>
          <Plus fontSize={15} />
        </div>
      </CardBody>
    </HeroUiCard>
  );
};

export default Card;
