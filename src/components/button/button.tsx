import React, { useCallback } from "react";
import { ButtonProps } from "../data-types/data-types";

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, text } = props;
  const btnClick = useCallback(() => {
    onClick && onClick();
  }, []);

  return (
    <button className="button" onClick={btnClick}>
      { text }
    </button>
  );
};

export default Button;
