import { ButtonProps } from "../data-types/data-types";

const Button = (props: ButtonProps) => {
  const { onClick, text } = props;
  const btnClick = ()=> {
    onClick && onClick();
  };

  return (
    <button className="button" onClick={btnClick}>
      { text }
    </button>
  );
};

export default Button;
