import React from "react";
import { StyleSheet, View } from "react-native";
import ModeButton from "../ui/ModeButton";
import { ChipButton, SectionHeader } from "../../../ui";
import routes from "../../../routes/routes";
import { useRouter } from "expo-router";

const PosModeLinks = {
  manual: "store-pos-manual",
};

const PosQuickMode = ({ containerStyle = {} }) => {
  const { stack: routeStack } = routes;
  const router = useRouter();
  const handlePosMode = (mode) => {
    router.push(routeStack[PosModeLinks[mode]]?.path);
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader
        title={"New Transaction"}
        renderTitle={({ TitleTextComponent, fontSize, color, title }) => (
          <View style={styles.sectionTitle}>
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
        <ModeButton
          icon={"PosManualMode"}
          label={"Search"}
          onPress={() => handlePosMode("manual")}
        />
        <ModeButton icon={"PosScanMode"} label={"Camera"} />
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
  sectionTitle: { flexDirection: "row", alignItems: "center", gap: 10 },
});

export default PosQuickMode;
