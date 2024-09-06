import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form";
import { Input } from "../../../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import RTButton from "../../RTButton";
import { Label } from "@radix-ui/react-label";

const PasswordInput = ({
  onChange,
  value,
  defaultValue,
  label,
  readOnly,
  id,
  placeholder,
  form,
  name = "",
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
  label?: string;
  readOnly?: boolean;
  id?: string;
  placeholder?: string;
  form?: any;
  name?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  if (form) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <>
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl className="relative">
                <Input
                  id={id}
                  type={showPassword ? "text" : "password"}
                  required={true}
                  onChange={onChange}
                  value={value}
                  defaultValue={defaultValue}
                  readOnly={readOnly}
                  placeholder={placeholder}
                />
                <RTButton.Icon
                  className="absolute right-0 top-0 h-full px-2"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={
                    showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </>
        )}
      />
    );
  } else {
    return (
      <div className="grid gap-1">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            required={true}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            readOnly={readOnly}
            placeholder={placeholder}
          />
          <RTButton.Icon
            className="absolute right-0 top-0 h-full px-2"
            onClick={() => setShowPassword(!showPassword)}
            icon={
              !showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )
            }
          />
        </div>
      </div>
    );
  }
};

export default PasswordInput;
