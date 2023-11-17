import React from "react";
import { StyleSheet, View } from "react-native";
import { SectionHeader } from "../../../ui";
import { appSpacing } from "../../../themes";
import PosSearchBar from "../ui/PosSearchBar";
import PosSearchResult from "../PosSearchResult";

const PosManualModeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <PosSearchBar />
      <SectionHeader
        title={"Search results"}
        containerStyle={{
          paddingHorizontal: appSpacing.screenPaddingLeft,
          paddingVertical: 8,
        }}
      />
      <PosSearchResult />
    </View>
  );
};
const styles = StyleSheet.create({});

export default PosManualModeScreen;
