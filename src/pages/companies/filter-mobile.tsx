import React from 'react';
import { useState } from 'react';

export const FilterMobile = ({ onSort }: { onSort:any;}) => {
  
  const [selected, setSelected] = useState("");
  console.log(selected);

  const handleChange = (e:any) => {
    setSelected(e.target.value);
    console.log(selected);
    onSort(selected, true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        Filter by
        <select onChange={(e)=>handleChange(e)}>
          <option value="name">company</option>
          <option value="location">headquarters</option>
          <option value="FTE.value">FTE</option>
          <option value="REV.value">revenue</option>
          <option value="kpis.Liquidity.value">liquidity</option>
          <option value="Runway">runway</option>
        </select>
      </div>
      <div>
        Order
        <select>
          <option>DESC</option>
          <option>ASC</option>
        </select>
      </div>
    </div>
  );
};