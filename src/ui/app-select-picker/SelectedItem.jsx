import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ChipButton from "../ChipButton";
import IconButton from "../IconButton";

const RenderAsText = ({ items }) => {
  return (
    <Text style={{ fontSize: appSizes.Text.regular }}>{items.join(", ")}</Text>
  );
};

const RenderAsChip = ({ items, onPress = ({ index }) => {} }) => {
  return (
    <>
      {items.map((item, index) => (
        <ChipButton
          label={item}
          key={`selected-category-chip-${item}`}
          buttonRight={() => (
            <IconButton
              onPress={() => onPress({ index })}
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
  chipClose = ({ index }) => {},
}) => {
  return renderType === "text" ? (
    <RenderAsText items={items} />
  ) : (
    <RenderAsChip items={items} onPress={({ index }) => chipClose({ index })} />
  );
};

const styles = StyleSheet.create({});

export default SelectedItem;
