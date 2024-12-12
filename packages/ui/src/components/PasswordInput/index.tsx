import React, { useState } from "react";

import { InputText, InputTextOptions } from "../InputText";

import { ToggleButton } from "./ToggleButton";

import { CreateWuiProps, forwardRef } from "@/system";

export type PasswordInputOptions = InputTextOptions;
export type PasswordInputProps = CreateWuiProps<"input", InputTextOptions>;

export const PasswordInput = forwardRef<"input", PasswordInputProps>(
  ({ dataTestId, title, ...rest }, ref) => {
    const [type, setType] = useState<"password" | "text">("password");
    const isHidden = type === "password";

    const handleToggle = () => {
      const nextType = isHidden ? "text" : "password";

      setType(nextType);
    };

    return (
      <InputText
        {...rest}
        dataTestId={dataTestId}
        icon={
          <ToggleButton
            dataTestId={dataTestId}
            isHidden={isHidden}
            onClick={handleToggle}
            title={title}
          />
        }
        iconPlacement="right"
        ref={ref}
        type={type}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";