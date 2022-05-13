import { LabelProps } from "../data-types/data-types";
import styles from './label.module.css'

const Label = (props: LabelProps) => {
  const { text, htmlFor } = props;

  return (
    <div className={styles.porsche_label}>
      <label className="lbl" htmlFor={htmlFor}>
        {text}
      </label>
    </div>
  );
};

export default Label;
