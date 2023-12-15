import React from "react";
import { View } from "react-native";

const Spacer = ({ size = 10, horizontal = true, onLayout = null }) => {
  const style = horizontal
    ? {
        width: size,
      }
    : {
        height: size,
      };
  return <View style={{ ...style }} onLayout={onLayout} />;
};

export default Spacer;
