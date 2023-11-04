import React from "react";
import { View } from "react-native";

const Spacer = ({ size = 10, horizontal = true }) => {
  const style = horizontal
    ? {
        width: size,
      }
    : {
        height: size,
      };
  return <View style={{ ...style }} />;
};

export default Spacer;
