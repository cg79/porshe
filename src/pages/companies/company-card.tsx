import React, { useState } from "react";

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

export const MobileCards: any = ({ companyList }: { companyList: any[] }) => {
  const [sortedList, setSortedList] = useState(companyList);
  const [selectedProperty, setSelectedProperty] = useState('fullname');
  const [sortOrder, setSortOrder] = useState(true);

  console.log('adasdasd', companyList.length);

  // const MAPPINGS: any = {
  //   company: 'fullname',
  //   headquarters: 'location',
  //   FTE: 'kpis.FTE.value',
  //   revenue: 'kpis.REV.value',
  //   liquidity: 'kpis.Liquidity.value',
  //   runway: 'Runway',
  // }

  const readObjectValueByPath = (source: any, path: string) => {
    const paths = path.split(".");
    if (paths.length === 1) {
      return source[path];
    }
    let ref = source;

    for (let i = 0; i < paths.length; i++) {
      const p = paths[i];
      ref = ref[p] || {};
    }

    return ref;
  }

  const f_sort = (dataArg: any[], propName: string, ascending = true) => {
    dataArg.sort(function (res01, res02) {
      var arg01 = readObjectValueByPath(res01,propName);// res01[colName.toLowerCase()];
      var arg02 = readObjectValueByPath(res02,propName);//res02[colName.toLowerCase()];
      if (arg01 < arg02) {
        return ascending ? -1 : 1;
      }
      if (arg01 > arg02) {
        return ascending ? 1 : -1;
      }
      return 0;
    });
    console.log(dataArg);
    setSortedList([...dataArg]);
    // console.log(sorted);

    return dataArg;
  };

  

  const handleChangeSortProperty = (e: any) => {
    debugger;
    //const sortBy = MAPPINGS[e.target.value];
    const sortBy = e.target.value;

    setSelectedProperty(e.target.value);
    console.log(setSelectedProperty);
    f_sort(sortedList, sortBy, sortOrder);
  };

  const handleChangeSortOrder = (e: any) => {
    debugger;
    setSortOrder(e.target.value === 'ASC'? false: true);
    // console.log(setSelectedProperty);
    f_sort(sortedList, selectedProperty, sortOrder);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          Filter by
          <select onChange={(e) => handleChangeSortProperty(e)}>
            <option value="name">company</option>
            <option value="location">headquarters</option>
            <option value="kpis.FTE.value">FTE</option>
            <option value="kpis.REV.value">revenue</option>
            <option value="kpis.Liquidity.value">liquidity</option>
            <option value="Runway">runway</option>
          </select>
        </div>
        <div>
          Order
          <select onChange={(e) => handleChangeSortOrder(e)}>
            <option>DESC</option>
            <option>ASC</option>
          </select>
        </div>
      </div>

      {sortedList.length}
      {sortedList.map((el) => {
        return (
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
        );
      })}
    </>
  );
};
