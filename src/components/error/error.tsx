import { ErrorProps } from "../data-types/data-types";

const ErrorMessage = (props: ErrorProps) => {
  const { message } = props;

  return (
    <span className="error">
      { message }
    </span>
  );
};

export default ErrorMessage;
