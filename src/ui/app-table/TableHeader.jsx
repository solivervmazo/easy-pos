import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appSpacing, appSizes, appFonts } from "../../themes";
import IconButton from "../IconButton";
import ChipButton from "../ChipButton";
import Icon from "../core/Icon";
const TableHeader = () => {
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
              containerStyle={{ backgroundColor: appColors.lightBackgroud }}
            />
          )}
          label={"Add"}
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
        <IconButton icon={"Filters"} size={appSizes.Icon.large} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TableHeader;
