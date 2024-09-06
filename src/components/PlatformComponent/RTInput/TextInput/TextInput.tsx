import React from "react";
import { Input } from "../../../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Label } from "@radix-ui/react-label";

const TextInput = ({
  onChange,
  value,
  defaultValue,
  label,
  readOnly,
  name = "",
  form,
  placeholder,
  id,
  type,
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  label?: string;
  readOnly?: boolean;
  name?: string;
  form?: any;
  placeholder?: string;
  id?: string;
  type?: string;
}) => {
  if (form)
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <>
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  required={true}
                  onChange={onChange}
                  value={value}
                  defaultValue={defaultValue}
                  readOnly={readOnly}
                  placeholder={placeholder}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
    );
  else {
    return (
      <div className="grid gap-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
          type={type ? type : "text"}
          id={id}
          required={true}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          readOnly={readOnly}
          placeholder={placeholder}
          
        />
      </div>
    );
  }
};

export default TextInput;
