import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";

function DatePickerForGrid(props) {
  const { RangePicker } = DatePicker;
  const onChange = (value, dateString) => {
    if (props.range)
      props.setValue([
        value[0].format("YYYY-MM-DD"),
        value[1].format("YYYY-MM-DD"),
      ]);
    else props.setValue(value.format("YYYY-MM-DD"));
  };

  if (props.range)
    return (
      <span>
        <RangePicker
          value={
            props.value
              ? [
                  dayjs(props.value[0], "YYYY-MM-DD"),
                  dayjs(props.value[1], "YYYY-MM-DD"),
                ]
              : undefined
          }
          format={props.format}
          onChange={onChange}
        />
      </span>
    );
  else
    return (
      <span>
        <DatePicker
          value={props.value ? dayjs(props.value, "YYYY-MM-DD") : undefined}
          format={props.format}
          onChange={onChange}
        />
      </span>
    );
}

export default DatePickerForGrid;
