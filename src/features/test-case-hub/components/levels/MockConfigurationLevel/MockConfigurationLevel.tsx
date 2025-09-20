import { Select, SelectItem } from "@heroui/select";
import { GitCommit } from "iconoir-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";
import {
  MockOption,
  ServerOption,
  useMockApi,
} from "@/hooks/UseMockApi/useMockApi";
import { RadioGroup, Radio } from "@heroui/react";

interface MockConfigurationLevelProps {
  onSelectedMockOption: (selectedMockOption?: MockOption) => void;
}

const MockConfigurationLevel = ({
  onSelectedMockOption,
}: MockConfigurationLevelProps) => {
  const { postData, mockOptions, loading } = useMockApi();
  const [serverOptions, setServerOptions] = useState<ServerOption[]>([]);
  const [selectedMockOption, setSelectedMockOption] = useState<MockOption>();

  const saveMockOption = async (mockOption: MockOption) => {
    const { data } = await postData(mockOption);
    setSelectedMockOption(mockOption);
    setServerOptions(data.serverOptions);
  };

  useEffect(
    () => onSelectedMockOption(selectedMockOption),
    [selectedMockOption, setSelectedMockOption]
  );

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="py-2">
        <div className="flex w-full flex-wrap">
          <Select
            isLoading={loading && mockOptions.length === 0}
            size="lg"
            className="w-full border rounded-sm border-gray-200"
            radius="sm"
            placeholder="Choose a step to mock..."
            classNames={{
              trigger: "bg-white",
            }}
          >
            {mockOptions.map((mockOption) => (
              <SelectItem
                onClick={() => saveMockOption(mockOption)}
                key={mockOption.id}
              >
                {mockOption.svgPath} {mockOption.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {loading && mockOptions.length !== 0 ? (
          <div className="flex flex-col items-center justify-center mt-12">
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-12">
            {serverOptions?.length === 0 ? (
              <>
                <div className="p-1 bg-gray-100 rounded-md mb-4">
                  <GitCommit fontSize={32} />
                </div>
                <span className="text-sm text-black max-w-[70%] text-center">
                  Choose a step to see saved mocked responses.
                </span>
              </>
            ) : (
              <RadioGroup isRequired className="flex flex-col items-center">
                {serverOptions.map((serverOption) => {
                  return (
                    <Radio
                      description={serverOption.createdAt?.toString()}
                      value={serverOption.label}
                    >
                      {serverOption.label}
                    </Radio>
                  );
                })}
              </RadioGroup>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockConfigurationLevel;
