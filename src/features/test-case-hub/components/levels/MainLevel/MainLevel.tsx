import { useState } from "react";
import Option, { PATH_CONDITIONS, PATH_OPTIONS } from "./constants";
import Card from "@/components/shared/Card/Card";
import { Switch } from "@heroui/switch";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { CreateLevels } from "@/features/test-case-hub/hooks/levelManager/types";

interface MainLevelProps {
  onLevelSelect: (level: CreateLevels) => void;
}

const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

const MainLevel = ({ onLevelSelect }: MainLevelProps) => {
  const [fullFlow, setFullFlow] = useState<boolean>(false);


  const onStepCardClick = (option: Option) => {
    const { level } = option;

    if (!level) return;

    return onLevelSelect(level);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-4">
        <div className="flex w-full justify-between items-center">
          <h2 className="uppercase font-semibold text-xs tracking-widest">
            Define Path
          </h2>
          <div className="flex items-center">
            <p className="text-xs">
              Full flow <span className="text-gray-500">(8 steps)</span>
            </p>
            <Switch
              className="ml-2"
              size="sm"
              isSelected={fullFlow}
              onChange={() => setFullFlow(!fullFlow)}
            ></Switch>
          </div>
        </div>
        <ul className="flex flex-col">
          {PATH_OPTIONS.map((option: Option) => (
            <li className="mt-2">
              <Card title={option.title} description={option.description} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mt-4 mb-4">
        <h2 className="uppercase font-semibold text-xs tracking-widest">
          Define the conditions
        </h2>
        <ul>
          {PATH_CONDITIONS.map((option: Option) => (
            <li className="mt-4">
              <Card onClick={() => onStepCardClick(option)} title={option.title} description={option.description} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col mt-4">
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
            placeholder="Enter your name"
            type="text"
            classNames={{
              inputWrapper: "bg-white border-b border-gray-200",
            }}
          />
          <Textarea
            radius="none"
            isRequired
            label="Description"
            labelPlacement="inside"
            name="description"
            placeholder="Enter your description"
            type="description"
            classNames={{
              inputWrapper: "bg-white border-b border-gray-200",
            }}
          />
          <div className="flex w-full flex-wrap">
            <Select
              className="w-full"
              radius="none"
              label="Select an animal"
              classNames={{
                trigger:'bg-white'
              }}
            >
              {animals.map((animal) => (
                <SelectItem key={animal.key}>
                  {animal.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MainLevel;
