import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard = ({ className }: SkeletonCardProps) => {
  return (
    <Card
      className={`w-full p-4 flex flex-flow border border-gray-200 ${className}`}
      radius="lg"
      shadow="none"
    >
      <div className="flex flex-row w-full items-center">
        <Skeleton className="h-10 w-11 max-h-[32px] max-w-[32px] rounded-md" />
        <div className="flex flex-col w-full ml-4">
          <Skeleton className="w-full h-[20px] max-w-[200px] rounded-lg mb-[2px]" />
          <Skeleton className="w-full h-[20px] max-w-[162px] rounded-lg" />
        </div>
        <Skeleton className="flex rounded-full w-6 h-5" />
      </div>
    </Card>
  );
};

export default SkeletonCard;
