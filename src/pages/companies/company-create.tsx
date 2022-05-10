
import { observer } from "mobx-react-lite";
import Router from "next/router";
import { useCallback, useState } from "react";
import Button from "../../components/button/button";
import { ROUTES } from "../../constants/constants";
import store from './store/CompaniesStore';
// import { CompaniesProps } from "./data-types/data-types";

const CreateCompany = observer(() => {
  const [name, setName] = useState("");

  const onAddCompany = () => {
    const newCompany = {
      name,
    };
    store.saveNewCompany(newCompany).then((val: any) => {
      Router.push(ROUTES.COMPANIES);
    });
  };


  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <button className="button" onClick={onAddCompany}>
      SAVE
    </button>
      {/* <Button text={'SAVE1'} onClick={onAddCompany}></Button> */}
    </div>
  );
});

export default CreateCompany;
