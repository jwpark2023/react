import { DatePicker, DatePickerProps } from 'antd';

function DatePickerForGrid (props) {

 const { RangePicker } = DatePicker;
 const onChange = (value, dateString) => {

    props.setValue(`${dateString}`);

 }

 if(props.range)
    return <span><RangePicker defaultValue={props.defaultValue} format={props.dateFormat} onChange={onChange}/></span>
 else
    return  (<span><DatePicker defaultValue={props.defaultValue} format={props.dateFormat} onChange={onChange}/></span>)

    //format : 'DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'YYYY/MM/DD', 'YYYY/MM/, 'MM/DD'
    //defaultValue_rangepicker : {[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
    //defaultValue_DatePicker : {dayjs('2015/01/01', dateFormat)}

}

export default DatePickerForGrid;