import { OverviewProps } from "../data-types/data-types";

const OverviewCard = (props: OverviewProps) => {
  const { m1, m2, m3, m4, m5 } = props.props;

  return (
    <div>
      <div className="one">{m1}</div>
      <div className="one">{m2}</div>
      <div className="one">{m3}</div>
      <div className="one">{m4}</div>
      <div className="one">{m5}</div>
    </div>
  );
};

export default OverviewCard;
