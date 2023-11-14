import React from "react";
import { StyleSheet, View } from "react-native";
import ModeButton from "../ui/ModeButton";
import { ChipButton, SectionHeader } from "../../../ui";

const PosQuickMode = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader
        title={"New Transaction"}
        renderTitle={({ TitleTextComponent, fontSize, color, title }) => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TitleTextComponent
              title={title}
              fontSize={fontSize}
              color={color}
            />
            <ChipButton
              label={"Started"}
              labelStyle={{ fontSize: appSizes.Text.xSmall }}
              plain={true}
            />
          </View>
        )}
        containerStyle={{ paddingBottom: 12 }}
      />
      <View style={styles.contentContainer}>
        <ModeButton icon={"PosScanMode"} label={"Camera"} />
        <ModeButton icon={"PosManualMode"} label={"Search"} />
        <ModeButton icon={"PosShortkeysMode"} label={"Shortkey"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  contentContainer: { flexDirection: "row", justifyContent: "space-around" },
});

export default PosQuickMode;
