export interface MockOption {
  id: string;
  label: string;
  key: any;
  serverOption?: ServerOption;
}

export interface ServerOption {
  id: string;
  label: string;
  createdAt?: Date;
}