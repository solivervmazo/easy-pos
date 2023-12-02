import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ChipButton from "../ChipButton";
import IconButton from "../IconButton";
import { appColors, appSizes } from "../../themes";
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "../core/Icon";

const RenderAsText = ({ items }) => {
  return (
    <Text style={{ fontSize: appSizes.Text.regular }}>{items.join(", ")}</Text>
  );
};

const RenderAsChip = ({
  items,
  onPress = ({ itemKeyIndex }) => {},
  canClose,
}) => {
  return (
    <>
      {items.map((item) => (
        <View
          style={{
            borderRadius: 15,
            backgroundColor: canClose
              ? appColors.lightSuccessSecondary
              : appColors.lightBgTertiary,
            paddingHorizontal: 12,
            paddingVertical: 3,
            flexDirection: "row",
            alignItems: "center",
          }}
          key={`selected-category-chip-${item._$key}`}
        >
          <View style={{}}>
            <Text style={{ fontSize: appSizes.Text.regular }} numberOfLines={1}>
              {item._$label}
            </Text>
          </View>
          {canClose && <MaterialIcons name="close" />}
          {/* <View style={{ width: "auto" }}>
            <Text>ahashahs</Text>
          </View> */}
        </View>
        // <ChipButton
        //   label={item._$label}
        //   key={`selected-category-chip-${item._$key}`}
        //   buttonRight={() => (
        //     <IconButton
        //       onPress={() => onPress({ itemKeyIndex: item._$key })}
        //       containerStyle={{
        //         backgroundColor: appColors.lightBgSecondary,
        //       }}
        //       icon={"Close"}
        //     />
        //   )}
        // />
      ))}
    </>
  );
};

const SelectedItem = ({
  items,
  renderType = "text",
  canClose = true,
  chipClose = ({ itemKeyIndex }) => {},
}) => {
  return renderType === "text" ? (
    <RenderAsText items={Object.assign([], items).map((obj) => obj._$label)} />
  ) : (
    <RenderAsChip
      items={items}
      canClose={canClose}
      onPress={({ itemKeyIndex }) => chipClose({ itemKeyIndex })}
    />
  );
};

const styles = StyleSheet.create({});

export default SelectedItem;
