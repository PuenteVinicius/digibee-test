import Mock, { INITIAL_MOCKS } from "./contants";
import { Select, SelectItem } from "@heroui/select";
import { GitCommit } from "iconoir-react";
import { useState } from "react";
import { Skeleton } from "@heroui/skeleton";
import { useMockApi } from "@/hooks/UseMockApi/useMockApi";

interface MockConfigurationLevelProps {
  onClose: () => void;
}

const MockConfigurationLevel = ({ }: MockConfigurationLevelProps) => {
  const { postData } = useMockApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverOptions, setServerOptions] = useState<any>([]);

  const callAPIMock = (data: Mock) => {
    setIsLoading(true);
    postData(data)
      .then(() => setServerOptions([{name: 'tops'}]))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="py-2">
        <div className="flex w-full flex-wrap">
          <Select
            size="lg"
            className="w-full border rounded-sm border-gray-200"
            radius="sm"
            placeholder="Choose a step to mock..."
            classNames={{
              trigger: "bg-white",
            }}
          >
            {INITIAL_MOCKS.map((mock) => (
              <SelectItem onClick={() => callAPIMock(mock)} key={mock.id}>
                {mock.name}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <>
              <div className="max-w-[300px] w-full flex items-center gap-3">
                <div>
                  <Skeleton className="flex rounded-full w-12 h-12" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-3 w-3/5 rounded-lg" />
                  <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div>
              </div>
            </>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-12">
            {serverOptions.length === 0 ? (
              <>
                <div className="p-1 bg-gray-100 rounded-md mb-4">
                  <GitCommit fontSize={32} />
                </div>
                <span className="text-sm text-black max-w-[70%] text-center">
                  Choose a step to see saved mocked responses.
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default MockConfigurationLevel;
