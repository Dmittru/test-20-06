import React from "react";
import { IButtonProps } from "../../src/lib/types";

export const Button = React.memo(
  ({ children, ...props }: IButtonProps): JSX.Element => {
    return (
      <button type="button" {...props}>
        {children}
      </button>
    );
  }
);

export default Button;
