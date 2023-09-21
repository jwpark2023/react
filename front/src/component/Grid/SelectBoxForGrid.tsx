import React,{useState} from 'react';
import { Select } from 'antd';


function SelectBoxForGrid (props) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;


  const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};


  return (
    <span>
      <Select
        placeholder="Select"
        style={{ width: 80 }}
        onChange={handleChange}
        options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
         />
    </span>
  );
};

export default SelectBoxForGrid;