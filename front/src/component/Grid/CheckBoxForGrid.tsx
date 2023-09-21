import React,{useState} from 'react';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

function CheckBoxForGrid (props) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const onChange = (e: CheckboxChangeEvent) => {

    console.log(props);
    // props.setallFlage(`${e.target.checked}`);
    props.setValue(`${e.target.checked}`);
  };

  return (
    <span>
      <Checkbox onChange={onChange}></Checkbox>
    </span>
  );
};

export default CheckBoxForGrid;