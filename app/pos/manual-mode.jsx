import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View, Keyboard } from "react-native";
import { IconButton, SectionHeader } from "../../src/ui";
import { appColors, appSizes, appSpacing } from "../../src/themes";
import { PosSearchBar, PosSearchResult } from "../../src/components/pos";

const ManualMode = () => {
  const itemInputRef = useRef();
  const [keyboardOff, setKeyboardOff] = useState(false);
  const toggleKeyboardHandle = useCallback(() => {
    if (!keyboardOff) {
      Keyboard.dismiss();
    }
    setKeyboardOff(!keyboardOff);
  }, [keyboardOff]);
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

export default ManualMode;

const styles = StyleSheet.create({});
