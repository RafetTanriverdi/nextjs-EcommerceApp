import React from "react";
import { Input } from "../../../ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";

const TextInput = ({
  onChange,
  value,
  defaultValue,
  label,
  readOnly
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  label?: string;
  readOnly?: boolean;
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          required={true}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          readOnly={readOnly}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default TextInput;
