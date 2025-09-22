import { useState } from "react";
import Option, { PATH_CONDITIONS, PATH_OPTIONS } from "./constants";
import Card from "@/components/shared/Card/Card";
import { Switch } from "@heroui/switch";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { CreateLevels } from "@/features/test-case-hub/hooks/levelManager/types";
import { MockOption } from "@/types";

const groups = [
  { key: "group-1", label: "Group 1" },
  { key: "group-2", label: "Group 2" },
  { key: "group-3", label: "Group 3" },
];
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
          moreAction
          key={selectedMockOption.id}
          title={selectedMockOption?.serverOption?.label}
          description={selectedMockOption.label}
          mockIcon={selectedMockOption.key}
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
              size="sm"
              isSelected={fullFlow}
              onChange={() => setFullFlow(!fullFlow)}
            ></Switch>
          </div>
        </div>
        <ul className="flex flex-col mt-4">
          {PATH_OPTIONS.map((option: Option, index: number) => (
            <li key={`${option.title}-${index}`}>
              <Card title={option.title} description={option.description} />
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
                  onClick={() => onStepCardClick(option)}
                  title={option.title}
                  description={option.description}
                />
              )}
            </li>
          ))}
          {mockOptions.length !== 0 && (
            <div
              onClick={() => onLevelSelect(CreateLevels.MOCK_CONFIGURATION)}
              className="flex w-full mt-4 justify-end cursor-pointer"
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
            color="primary"
            radius="none"
            isRequired
            label="Name"
            labelPlacement="inside"
            name="name"
            placeholder="Enter the name of the test"
            type="text"
            classNames={{
              inputWrapper: "bg-white border-b border-gray-200",
              input: "placeholder:text-foreground-500",
            }}
          />
          <Textarea
            radius="none"
            isRequired
            label="Description"
            labelPlacement="inside"
            name="description"
            placeholder="Add information about the test"
            type="description"
            classNames={{
              inputWrapper: "bg-white border-b border-gray-200",
            }}
          />
          <div className="flex w-full flex-wrap">
            <Select
              className="w-full"
              radius="none"
              label="Group"
              placeholder="Add your test to a group"
              labelPlacement="inside"
              classNames={{
                trigger: "bg-white",
              }}
            >
              {groups.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MainLevel;
