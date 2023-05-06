import { Control, RegisterOptions, UseFormSetValue } from 'react-hook-form';

type TOption = {
  key: string;
  content: string;
};

export interface HookFormProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
  defaultValue?: any;
  setValue?: UseFormSetValue<any>;
  options?: TOption[]; //Dropdown
  multiselect?: boolean;
  placeholder?: string;
  contentAfter?: string; //Input
  validationMessage?: string;
}
