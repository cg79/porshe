// import { useEffect } from "react";
import store from "../../store/company/CompaniesStore";

const CompanyGrid = () => {
    debugger;

    // useEffect(() => {
    //     store.load();
    //   }, []);
      
  return (
    <ul className="flex-container wrap">
      {store.list.map((comp: any) => {
        return (
          <li className="flex-item company" key={comp["id"]}>
            <img className="image" src={comp["img"]}></img>
            <div className="title">
              <div>{comp["name"]}</div>
            </div>
          </li>
        );
      })}

      {/* <li className="flex-item">1</li>
      <li className="flex-item">2</li>
      <li className="flex-item">3</li>
      <li className="flex-item">4</li>
      <li className="flex-item">5</li>
      <li className="flex-item">6</li>
      <li className="flex-item">7</li>
      <li className="flex-item">8</li> */}
    </ul>
  );
};

export default CompanyGrid;
