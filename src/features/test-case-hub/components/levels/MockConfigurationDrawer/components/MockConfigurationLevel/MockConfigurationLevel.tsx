import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";
import { RadioGroup, Radio, cn } from "@heroui/react";

import { useMockApi } from "@/hooks/UseMockApi/useMockApi";
import SkeletonCard from "@/components/shared/SkeletonCard/SkeletonCard";
import MockEmptyState from "@/components/shared/MockEmptyState/MockEmptyState";
import { MockOption, ServerOption } from "@/types";
import useMockIcons from "@/hooks/UseMockIcons/useMockIcons";

import TagMockIcon from "../../../../../../../assets/tag-mock.svg?react";

interface MockConfigurationLevelProps {
  onSelectedMockOption: (selectedMockOption: MockOption) => void;
}

const MockConfigurationLevel = ({
  onSelectedMockOption,
}: MockConfigurationLevelProps) => {
  const { postData, mockOptions, loading } = useMockApi();
  const [serverOptions, setServerOptions] = useState<ServerOption[]>([]);
  const [mockOption, setMockOption] = useState<MockOption>();
  const { getIcon } = useMockIcons();

  const saveServerOption = (serverOption: ServerOption) => {
    if (mockOption) {
      const updateMockOption: MockOption = { ...mockOption, serverOption };

      setMockOption(updateMockOption);
      onSelectedMockOption(updateMockOption);
    }
  };

  const saveMockOption = async (mockOption: MockOption) => {
    setMockOption(mockOption);
    const { data } = await postData(mockOption);

    setServerOptions(data.serverOptions);
  };

  return (
    <div className="flex flex-col w-full justify-center px-0">
      <div className="flex w-full flex-wrap mt-10 pb-6 border-b border-gray-200 rounded-lg">
        <Select
          aria-label="none"
          aria-hidden="true"
          className="w-full mx-6 h-[60px]"
          classNames={{
            mainWrapper: "flex items-center h-full",
            trigger: "bg-white h-full border",
          }}
          isLoading={loading && mockOptions.length === 0}
          placeholder="Choose a step to mock..."
          radius="lg"
          size="lg"
          startContent={
            <>
              {!!mockOption && (
                <div className="flex items-center">
                  {getIcon(mockOption.key)}
                </div>
              )}
            </>
          }
          variant="bordered"
        >
          {mockOptions.map((mockOption) => (
            <SelectItem
              key={mockOption.id}
              startContent={
                <div className="flex items-center">
                  {getIcon(mockOption.key)}
                </div>
              }
              onClick={() => saveMockOption(mockOption)}
            >
              {mockOption.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex items-center justify-center mx-6">
        {loading && mockOptions.length !== 0 ? (
          <div className="w-full mt-8 flex flex-col">
            <SkeletonCard />
            <SkeletonCard className="mt-2" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            {serverOptions?.length === 0 ? (
              <MockEmptyState className="flex flex-col items-center justify-center mt-12" />
            ) : (
              <RadioGroup isRequired className="flex flex-col items-center">
                {serverOptions.map((serverOption) => (
                  <Radio
                    key={serverOption.id}
                    classNames={{
                      base: cn(
                        "inline-flex m-0 ml-2 hover:border-primary items-center justify-between",
                        "flex-row-reverse cursor-pointer rounded-lg p-4",
                        "border border-gray-200"
                      ),
                    }}
                    description={serverOption.createdAt?.toString()}
                    value={serverOption.label}
                    onChange={() => saveServerOption(serverOption)}
                  >
                    <TagMockIcon />
                    {serverOption.label}
                  </Radio>
                ))}
              </RadioGroup>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockConfigurationLevel;
