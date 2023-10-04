import React, { useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

function CheckBoxForGrid(props) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(e.target.checked);
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
        // checked={true}
        checked={props.value && props.value === "Y" ? true : false}
      ></Checkbox>
    </span>
  );
}

export default CheckBoxForGrid;
