import React from "react";

const thousandsFormatWithCommas = (number: number) => {
  return number
    ? Math.round(number / 1000)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " k"
    : "";
};

const millionsFormatWithCommas = (number: any) => {
  return number
    ? (Math.round(number / 1000 / 10) / 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " m"
    : "";
};

const dynamicFormatWithCommas = (number: any) => {
  if (number > 1000000) {
    return millionsFormatWithCommas(number);
  } else if (number > 1000) {
    return thousandsFormatWithCommas(number);
  } else if (number > 0) {
    return number + " ";
  }
  return "";
};


export const MobileCards: any = ({sorted}: {sorted:any}) => {
  const items: any = [];
  sorted.map((el:any) =>
    items.push(
      <div className="portfolio-mobile-card">
        <table style={{ width: "100%" }}>
          <tbody>
            <tr className="card-split">
              <td className="first-column">Company</td>
              <td className="second-column second-column-company">
                {el.name.toUpperCase()}
              </td>
            </tr>
            <tr className="card-split">
              <td className="first-column">Headquarters</td>
              <td className="second-column">{el.location}</td>
            </tr>
            <tr className="card-split">
              <td className="first-column">FTE</td>
              <td className="second-column">
                <span>{el.kpis?.FTE?.value}</span>
                <span>{el.kpis?.FTE?.growth}</span>
              </td>
            </tr>
            <tr className="card-split">
              <td className="first-column">Monthly Rev</td>
              <td className="second-column">
                {dynamicFormatWithCommas(el.kpis?.REV?.value)}
                {el.kpis?.REV?.currency}
              </td>
            </tr>
            <tr className="card-split">
              <td className="first-column">Liquidity</td>
              <td className="second-column">
                <span>
                  {dynamicFormatWithCommas(el.kpis?.Liquidity?.value)}
                  {el.kpis?.Liquidity?.currency}
                </span>
                <span>{el.kpis?.Liquidity?.growth}</span>
              </td>
            </tr>
            <tr className="card-split">
              <td className="first-column">Runway</td>
              <td className="second-column">
                <span>{el.Runway} </span>
                <span>months</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );

  return items;
};
