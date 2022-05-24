import { OverviewProps } from "../data-types/data-types";

const OverviewCard = (props: any) => {

  const { m1, m2, m3, m4, m4_text = "", m5, m5_text='', onClick } = props.props;

  const executeClick=()=>{
    // debugger;
    if(!onClick){
      return;
    }

    onClick();
  }

  return (
    <div className="linebk mt10" style={{ width: "20%", marginRight: "25px" }} onClick={executeClick}>
      <div className="one porsche-font">{m1}</div>
      <div
        className="mt10"
        style={{
          fontWeight: "700",
          fontSize: "120px",
        }}
      >
        {m2}
      </div>

      <div
        className="mt10"
        style={{
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        {m3}
      </div>

      <div className="flex">
        <div className="one">{m4}</div>
        <div className="one">{m4_text}</div>
      </div>

      <div className="flex">
        <div className="one">{m5}</div>
        <div className="one">{m5_text}</div>
      </div>

      {/* <div className="one">{m5}</div> */}
    </div>
  );
};

export default OverviewCard;
