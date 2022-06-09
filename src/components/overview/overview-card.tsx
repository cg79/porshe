import { OverviewProps } from "../data-types/data-types";
import styles from "./overview-card.module.css";

const OverviewCard = (props: any) => {
  const {
    m1,
    m2,
    m3,
    m4,
    m4_text = "",
    m5,
    m5_text = "",
    onClick,
  } = props.props;

  const executeClick = () => {
    // debugger;
    if (!onClick) {
      return;
    }

    onClick();
  };

  const fontProps='18px';

  const renderM4M4Text=(m4:string, m4Text:string)=>{
    if(m4){
      return (
        <><div className="bold" style={{maxWidth:"300px"}}>{m4}</div><div className="ml5" style={{ maxWidth: "300px" }}>{m4Text}</div></>
      )
    }
    return (
      <div  style={{maxWidth:"300px"}}>{m4Text}</div>
    )
  }

  return (
    <div className={`font-porsche ${styles.linebk}`} onClick={executeClick}>
      <div style={{marginLeft:"20px", paddingTop:"20px", fontSize:fontProps}}>
        <div className="one mt1" >
          {m1}
        </div>
        <div
          className=""
          style={{
            fontWeight: "bold",
            fontSize: "4em",
          }}
        >
          {m2}
        </div>

        <div>{m3}</div>

        <div className="flex" style={{fontSize:fontProps}}>
          {/* <div className="one bold">{m4}</div> */}
          {/* <div className="one ml5" style={{maxWidth:"300px"}}>{m4_text}</div> */}
          {renderM4M4Text(m4, m4_text)}
        </div>

        <div className="flex" style={{fontSize:fontProps}}>
          {/* <div className="one bold">{m5}</div>
          <div className="one ml5" >
            {m5_text}
          </div> */}
          {renderM4M4Text(m5, m5_text)}
        </div>

        <div className="mt10">&nbsp;</div>
      </div>
    </div>
  );
};

export default OverviewCard;
