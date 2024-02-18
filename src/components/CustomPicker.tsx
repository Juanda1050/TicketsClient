import { DatePicker } from "antd";
import { DatePickerProps } from "antd/lib/date-picker";
import dayjs, { Dayjs } from "dayjs";

interface CustomDatePickerProps extends DatePickerProps {
  disabled?: boolean;
}

const dateFormat = "DD/MM/YYYY";

const disabledDate: (current: Dayjs | undefined) => boolean = (current) => {
  return !!current && current.isAfter(dayjs(), "day");
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  disabled,
  ...restProps
}) => {
  return (
    <DatePicker
      style={{ width: "100%" }}
      disabled={disabled}
      format={dateFormat}
      disabledDate={disabledDate}
      {...restProps}
    />
  );
};

export default CustomDatePicker;
