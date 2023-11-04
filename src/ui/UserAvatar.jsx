import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const UserAvatar = ({ source, size = appSizes.Avatar.regular }) => {
  return (
    <ImageBackground
      source={source}
      style={[styles.avatar, { width: size, borderRadius: size / 2 }]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginTop: 5,
    backgroundColor: "grey",
    aspectRatio: "1/1",
    overflow: "hidden",
  },
});

export default UserAvatar;
