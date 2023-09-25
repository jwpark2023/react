import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

function CheckBoxForGrid(props) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      props.setValue("Y");
    } else {
      props.setValue("N");
    }
  };

  return (
    <span>
      <Checkbox
        onChange={onChange}
        checked={props.value ? "Y" : props.setValue("Y")}
      ></Checkbox>
    </span>
  );
}

export default CheckBoxForGrid;
