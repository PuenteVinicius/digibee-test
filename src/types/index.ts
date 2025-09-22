import { MockIcon } from "@/hooks/UseMockIcons/useMockIcons";

export interface MockOption {
  id: string;
  label: string;
  key: MockIcon;
  serverOption?: ServerOption;
}

export interface ServerOption {
  id: string;
  label: string;
  createdAt?: Date;
}
