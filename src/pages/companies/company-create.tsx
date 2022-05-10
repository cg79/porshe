// create a new company form

import { useCallback, useState } from "react";
export const NewTodoForm = (props:any) => {

  const { actions, handlers } = props;
  const [name, setName] = useState('');

  const onAddCompany = useCallback(() => {
    const newCompany = {
      name
    };
    handlers.onNewCompany(newCompany);
  },[])

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <button onClick={() => onAddCompany()}>
          SAVE
      </button>
    </div>
  );
};
