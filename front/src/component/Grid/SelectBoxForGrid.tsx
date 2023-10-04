import React, { useState } from "react";
import { Select } from "antd";

function SelectBoxForGrid(props) {
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
      />
    </span>
  );
}

export default SelectBoxForGrid;
