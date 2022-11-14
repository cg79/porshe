import Router from "next/router";
import React from "react";
import { ROUTES } from "../../constants/constants";
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

  const redirectToCompanies = () => {
    debugger;
    Router.push(ROUTES.COMPANIES);
  };
  const fontProps = "18px";

  const renderM4M4Text = (m4: string, m4Text: string) => {
    if (m4) {
      return (
        <>
          <div className="bold" style={{ maxWidth: "300px" }}>
            {m4}
          </div>
          <div className="ml5" style={{ maxWidth: "300px" }}>
            {m4Text}
          </div>
        </>
      );
    }
    return <div style={{ maxWidth: "300px" }}>{m4Text}</div>;
  };

  return (
    <div
      className={`font-porsche ${styles.linebk}`}
      onClick={redirectToCompanies}
    >
      <div
        style={{ marginLeft: "20px", paddingTop: "20px", fontSize: fontProps }}
      >
        <div
          className="one mt1 m1"
          style={{
            fontSize: "1.1em",
          }}
        >
          {m1}
        </div>
        <div className="m2m3">
          <div
            style={{
              fontWeight: "700",
              fontSize: "4em",
            }}
          >
            {m2}
          </div>

          <div
            style={{
              fontWeight: "700",
              paddingTop: "60px",
              paddingLeft: "5px",
            }}
          >
            {m3}
          </div>
        </div>

        <div className="flex" style={{ fontSize: fontProps }}>
          {renderM4M4Text(m4, m4_text)}
        </div>

        <div className="flex" style={{ fontSize: fontProps }}>
          {renderM4M4Text(m5, m5_text)}
        </div>

        <div className="mt10">&nbsp;</div>
      </div>
    </div>
  );
};

export default OverviewCard;
