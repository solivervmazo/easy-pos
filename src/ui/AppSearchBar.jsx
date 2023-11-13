import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors, appConstants, appSizes } from "../themes";

const AppSearchBar = ({
  placeholder = "",
  itemLeft = () => {},
  itemRight = () => {},
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        containerStyle={{
          flex: 1,
          flexGrow: 1,
          borderRadius: 22,
          backgroundColor: appColors.lightBackground,
          overflow: "hidden",
          justifyContent: "center",
        }}
        onPress={() => {
          console.log("Pressed 1");
        }}
        activeOpacity={appConstants.ACTIVE_OPACITY}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: appColors.themeColorSecondary,
              fontSize: appSizes.Text.regular,
            }}
          >
            {placeholder}
          </Text>
          {itemRight()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default AppSearchBar;
