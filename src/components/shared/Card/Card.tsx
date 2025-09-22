import { CardBody, Card as HeroUiCard } from "@heroui/card";
import { Plus, MoreVert } from "iconoir-react";
import JoltIcon from "../../../assets/pipeline-step-jolt.svg?react";
import RestIcon from "../../../assets/pipeline-step-rest.svg?react";
import SessionManagementIcon from "../../../assets/pipeline-step-session-management.svg?react";

export interface CardProps {
  title?: string;
  description?: any;
  moreAction?: boolean;
  mockIcon?: string;
  onClick?: () => void;
}

const Card = ({
  title,
  description,
  onClick = () => {},
  moreAction = false,
  mockIcon = "",
}: CardProps) => {
  return (
    <HeroUiCard
      shadow="none"
      onClick={() => onClick()}
      className="w-full border border-gray-200"
    >
      <CardBody className="py-3 pl-4 pr-5 flex flex-row justify-between items-center">
        <div className="flex items-center">
          {mockIcon && (
            <div className="flex mr-4 p-2 bg-gray-50 rounded-md">
              {mockIcon === "JOLT" && <JoltIcon height={24} width={24} />}
              {mockIcon === "REST" && <RestIcon height={24} width={24} />}
              {mockIcon === "SESSION_MANAGEMENT" && (
                <SessionManagementIcon height={24} width={24} />
              )}
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex p-0">
              <h3 className="text-sm font-medium tracking-[0.1px]">{title}</h3>
            </div>
            <p className="font-light text-sm text-gray-500 leading-5 p-0">
              {description}
            </p>
          </div>
        </div>
        <div className="p-0 cursor-pointer" onClick={() => onClick()}>
          {moreAction ? <MoreVert fontSize={12} /> : <Plus fontSize={15} />}
        </div>
      </CardBody>
    </HeroUiCard>
  );
};

export default Card;
