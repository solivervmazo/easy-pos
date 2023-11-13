import { StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import DateInput from "./DateInput";

const DatePicker = ({ value, onDateChange = ({ dateValue }) => {} }) => {
  const [date, setDate] = useState(value || new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onDateChange({ dateValue: currentDate });
  };

  return (
    <DateTimePicker
      value={date}
      mode={"date"}
      display={"spinner"}
      is24Hour={true}
      onChange={onChange}
    />
  );
};

const AppDaterangePicker = ({
  icon = "Calendar",
  iconSize = appSizes.Icon.medium,
  containerStyle = {},
  inputContainerStyle = {},
  labelStyle = {},
  iconContainerStyle = {},
  renderFrom = ({ inputHandler }) => undefined,
  renderTo = ({ inputHandler }) => undefined,
  onInputPress = ({ input, isShown = false, onShow = () => {} }) => {},
  onDateChange = ({ input, inputValue }) => {},
}) => {
  const [dateHandler, setDateHandler] = useState();
  const [show, setShow] = useState(false);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const onDatePress = (input) => {
    if (!input) return;
    setDateHandler(input);
    onInputPress({ input, isShown: show, onShow: setShow });
    setShow(true);
  };

  const onChange = ({ dateValue }) => {
    if (!dateHandler) return;
    if (dateHandler == "from") setDateFrom(dateValue);
    else setDateTo(dateValue);
    onDateChange({ input: dateHandler, inputValue: dateValue });
    setShow(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderFrom({ inputHandler: onDatePress }) || (
        <DateInput
          value={dateFrom?.toDateString() || undefined}
          placeholder={"Select From Date"}
          iconPosition={"buttonLeft"}
          onPress={() => {
            onDatePress("from");
          }}
          icon={icon}
          iconSize={iconSize}
          containerStyle={inputContainerStyle}
          labelStyle={labelStyle}
          iconContainerStyle={iconContainerStyle}
        />
      )}

      {renderTo({ inputHandler: onDatePress }) || (
        <DateInput
          value={dateTo?.toDateString() || undefined}
          placeholder={"Select To Date"}
          iconPosition={"buttonLeft"}
          onPress={() => {
            onDatePress("to");
          }}
          icon={icon}
          iconSize={iconSize}
          containerStyle={inputContainerStyle}
          labelStyle={labelStyle}
          iconContainerStyle={iconContainerStyle}
        />
      )}
      {show && (
        <DatePicker
          value={dateHandler == "from" ? dateFrom : dateTo}
          onDateChange={({ dateValue }) => {
            onChange({ dateValue });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10 },
});

export default AppDaterangePicker;
