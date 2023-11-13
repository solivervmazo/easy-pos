import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appSpacing, appSizes, appFonts } from "../../themes";
import IconButton from "../IconButton";
import ChipButton from "../ChipButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, router } from "expo-router";
const TableHeader = () => {
  const dateToday = new Date();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    // showMode("date");
    router.push({ pathname: "items/filterDate" });
  };

  return (
    <View
      style={{
        paddingHorizontal: 7,
        flexDirection: "row",
        paddingVertical: 8,
      }}
    >
      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <IconButton icon={"Refresh"} size={appSizes.Icon.large} />
        <ChipButton
          buttonLeft={() => (
            <IconButton
              disabled
              icon={"Add"}
              size={appSizes.Icon.medium}
              containerStyle={{ backgroundColor: appColors.lightBackground }}
            />
          )}
          label={"Add"}
          containerStyle={{
            borderRadius: appSizes.Icon.large,
          }}
        />
      </View>
      <View
        style={{
          flexShrink: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <ChipButton
          onPress={showDatepicker}
          buttonRight={() => (
            <IconButton
              disabled
              icon={"Calendar"}
              size={appSizes.Icon.medium}
              containerStyle={{ backgroundColor: appColors.lightBackground }}
            />
          )}
          label={
            dateToday.toDateString() == date.toDateString()
              ? "Today"
              : date.toLocaleDateString()
          }
          containerStyle={{
            borderRadius: appSizes.Icon.large,
            backgroundColor: appColors.lightBgTertiary,
          }}
          labelStyle={{
            color: appColors.darkText,
          }}
        />
        <IconButton icon={"Filters"} size={appSizes.Icon.large} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default TableHeader;
