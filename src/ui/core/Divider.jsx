import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColor } from "../../themes";

const Divider = ({ horizontal, style }) => {
  const orientation = horizontal
    ? {
        width: "100%",
        height: 0.8,
      }
    : {
        height: "100%",
        width: 0.5,
      };
  return (
    <View
      style={[
        {
          backgroundColor: appColors.lightText,
        },
        orientation,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({});

export default Divider;
