import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ChipButton from "../ChipButton";
import IconButton from "../IconButton";

const RenderAsText = ({ items }) => {
  return (
    <Text style={{ fontSize: appSizes.Text.regular }}>{items.join(", ")}</Text>
  );
};

const RenderAsChip = ({ items, onPress = ({ itemKeyIndex }) => {} }) => {
  return (
    <>
      {items.map((item) => (
        <ChipButton
          label={item._$label}
          key={`selected-category-chip-${item._$key}`}
          buttonRight={() => (
            <IconButton
              onPress={() => onPress({ itemKeyIndex: item._$key })}
              containerStyle={{
                backgroundColor: appColors.lightBgSecondary,
              }}
              icon={"Close"}
            />
          )}
        />
      ))}
    </>
  );
};

const SelectedItem = ({
  items,
  renderType = "text",
  chipClose = ({ itemKeyIndex }) => {},
}) => {
  return renderType === "text" ? (
    <RenderAsText items={Object.assign([], items).map((obj) => obj._$label)} />
  ) : (
    <RenderAsChip
      items={items}
      onPress={({ itemKeyIndex }) => chipClose({ itemKeyIndex })}
    />
  );
};

const styles = StyleSheet.create({});

export default SelectedItem;
