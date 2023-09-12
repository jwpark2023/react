import React from 'react';
import { Button } from 'antd';

function ButtonForGrid (props) {
  // const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  return (
    <span>
      <Button onClick={() => props.clicked()}>Push For Total</Button>
    </span>
  );
};

export default ButtonForGrid;