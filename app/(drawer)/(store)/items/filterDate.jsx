import { Text, View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Divider, ChipButton, IconButton } from "../../../../src/ui";
import { appColors, appSizes, appSpacing } from "../../../../src/themes";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

import { AppModal } from "../../../../src/ui";

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

const DateInput = ({
  iconPosition = "buttonLeft",
  label = undefined,
  placeholder = "Select Date",
  value = undefined,
  onPress = () => {},
}) => {
  const buttonPosition = {
    [iconPosition]: () => (
      <IconButton
        icon={"Calendar"}
        size={appSizes.Icon.medium}
        containerStyle={{ backgroundColor: appColors.lightBackgroud }}
      />
    ),
  };

  return (
    <View style={{ gap: 5 }}>
      {label ? (
        <Text style={{ fontSize: appSizes.Text.semiRegular }}>{label}</Text>
      ) : null}
      <ChipButton
        onPress={onPress}
        {...{}}
        {...buttonPosition}
        label={value || placeholder}
        containerStyle={{
          borderRadius: appSizes.Icon.large,
          backgroundColor: appColors.lightBgTertiary,
          paddingHorizontal: 15,
        }}
        labelStyle={{
          fontSize: appSizes.Text.regular,
          color: appColors.darkTextTertiary,
        }}
      />
    </View>
  );
};

const FilterDate = () => {
  const [dateHandler, setDateHandler] = useState();
  const [show, setShow] = useState(false);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const onDatePress = (input) => {
    if (!input) return;
    setDateHandler(input);
    setShow(true);
  };
  const onChange = ({ dateValue }) => {
    if (!dateHandler) return;
    if (dateHandler == "from") setDateFrom(dateValue);
    else setDateTo(dateValue);
    setShow(false);
  };
  return (
    <AppModal
      renderContent={() => (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <DateInput
              value={dateFrom?.toDateString() || undefined}
              placeholder={"Select From Date"}
              iconPosition={"buttonLeft"}
              onPress={() => {
                onDatePress("from");
              }}
            />

            <DateInput
              value={dateTo?.toDateString() || undefined}
              placeholder={"Select To Date"}
              iconPosition={"buttonLeft"}
              onPress={() => {
                onDatePress("to");
              }}
            />
            {show && (
              <DatePicker
                value={dateHandler == "from" ? dateFrom : dateTo}
                onDateChange={({ dateValue }) => {
                  onChange({ dateValue });
                }}
              />
            )}
          </View>
        </View>
      )}
    />
  );
};

export default FilterDate;
