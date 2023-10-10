import React, { useEffect, useState } from "react";
import { Select } from "antd";

function SelectBoxForGrid(props) {
  console.log("selecrender", props);

  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
  const handleChange = (value: string) => {
    props.setValue(value);
    console.log(`selected ${value}`);
  };

  return (
    <span>
      <Select
        placeholder="Select"
        style={{ width: "100%" }}
        onChange={handleChange}
        filterOption={true}
        options={props.options}
        value={props.value}
      />
    </span>
  );
}

export default SelectBoxForGrid;
