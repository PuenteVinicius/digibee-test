import { useState } from "react";
import { Switch } from "@heroui/switch";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

import Option, { PATH_CONDITIONS, PATH_OPTIONS } from "./constants";

import Card from "@/components/shared/Card/Card";
import { CreateLevels } from "@/features/test-case-hub/hooks/levelManager/types";
import { MockOption } from "@/types";
import { TEST_GROUPS } from "@/constants";

interface MainLevelProps {
  onLevelSelect: (level: CreateLevels) => void;
  mockOptions: MockOption[];
}

const MainLevel = ({ onLevelSelect, mockOptions = [] }: MainLevelProps) => {
  const [fullFlow, setFullFlow] = useState<boolean>(false);

  const onStepCardClick = (option: Option) => {
    const { level } = option;

    if (!level) return;

    return onLevelSelect(level);
  };

  const rendermockOptions = () => {
    return mockOptions?.map((selectedMockOption) => (
      <li className="mb-4 last:mb-0">
        <Card
          key={selectedMockOption.id}
          moreAction
          description={selectedMockOption.label}
          mockIcon={selectedMockOption.key}
          title={selectedMockOption?.serverOption?.label}
        />
      </li>
    ));
  };

  return (
    <div className="flex flex-col mt-10 px-6">
      <div className="flex flex-col">
        <div className="flex w-full justify-between items-end">
          <h2 className="uppercase font-semibold text-xs tracking-widest">
            Define Path
          </h2>
          <div className="flex items-end">
            <p className="text-[14px] font-medium text-primary-500">
              Full flow
              <span className="text-gray-400 text-sm font-normal ml-1">
                (8 steps)
              </span>
            </p>
            <Switch
              className="ml-2"
              isSelected={fullFlow}
              size="sm"
              onChange={() => setFullFlow(!fullFlow)}
            />
          </div>
        </div>
        <ul className="flex flex-col mt-4">
          {PATH_OPTIONS.map((option: Option, index: number) => (
            <li key={`${option.title}-${index}`}>
              <Card description={option.description} title={option.title} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mt-10">
        <h2 className="uppercase font-semibold text-xs tracking-widest">
          Define the conditions
        </h2>
        <ul>
          {PATH_CONDITIONS.map((option: Option, index: number) => (
            <li key={`${option.title}-${index}`} className="mt-4">
              {option.level === CreateLevels.MOCK_CONFIGURATION &&
              mockOptions.length !== 0 ? (
                rendermockOptions()
              ) : (
                <Card
                  description={option.description}
                  title={option.title}
                  onClick={() => onStepCardClick(option)}
                />
              )}
            </li>
          ))}
          {mockOptions.length !== 0 && (
            <div
              className="flex w-full mt-4 justify-end cursor-pointer"
              onClick={() => onLevelSelect(CreateLevels.MOCK_CONFIGURATION)}
            >
              <h2 className="font-semibold text-xs">Add new mock</h2>
            </div>
          )}
        </ul>
      </div>
      <div className="flex flex-col mt-10">
        <h2 className="uppercase font-semibold text-xs tracking-widest">
          Organize your Tests
        </h2>
        <Form className="w-full flex flex-col mt-4 border rounded-sm border-gray-200 gap-0">
          <Input
            isRequired
            classNames={{
              inputWrapper: "bg-white border-b border-gray-200",
              input: "placeholder:text-foreground-500",
            }}
            color="primary"
            label="Name"
            labelPlacement="inside"
            name="name"
            placeholder="Enter the name of the test"
            radius="none"
            type="text"
          />
          <Textarea
            isRequired
            classNames={{
              inputWrapper: "bg-white border-b border-gray-200",
            }}
            label="Description"
            labelPlacement="inside"
            name="description"
            placeholder="Add information about the test"
            radius="none"
            type="description"
          />
          <div className="flex w-full flex-wrap">
            <Select
              className="w-full"
              classNames={{
                trigger: "bg-white",
              }}
              label="Group"
              labelPlacement="inside"
              placeholder="Add your test to a group"
              radius="none"
            >
              {TEST_GROUPS.map((testGroup) => (
                <SelectItem key={testGroup.key}>{testGroup.label}</SelectItem>
              ))}
            </Select>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MainLevel;
