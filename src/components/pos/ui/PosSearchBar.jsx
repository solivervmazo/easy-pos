import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { IconButton } from "../../../ui";
import { appColors, appSizes, appSpacing } from "../../../themes";

const PosSearchBar = ({ onChange = ({ inputValue }) => {} }) => {
  const [value, setValue] = useState("");
  const [keyboardOff, setKeyboardOff] = useState(false);
  const toggleKeyboardHandle = useCallback(() => {
    if (!keyboardOff) {
      Keyboard.dismiss();
    }
    setKeyboardOff(!keyboardOff);
  }, [keyboardOff]);

  const onChangeText = (text) => {
    console.log("text:", text);
    setValue(text);
    onChange({ inputValue: text });
  };

  const onClearText = useCallback(() => {
    setValue("");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          showSoftInputOnFocus={!keyboardOff}
          cursorColor={appColors.themeColor}
          placeholder={"Search Item"}
          style={styles.searchInput}
        />
        {value && (
          <IconButton
            icon={"Close"}
            size={appSizes.Icon.medium}
            containerStyle={styles.inputButton}
            onPress={onClearText}
          />
        )}
        <IconButton
          icon={keyboardOff ? "KeyboardOff" : "Keyboard"}
          size={appSizes.Icon.medium}
          containerStyle={styles.inputButton}
          onPress={toggleKeyboardHandle}
        />
      </View>
      <IconButton
        icon={"PosScanMode"}
        size={appSizes.Icon.large}
        containerStyle={styles.searchBarButton}
      />
      <IconButton
        icon={"PosShortkeysMode"}
        size={appSizes.Icon.large}
        containerStyle={styles.searchBarButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: appColors.lightBgTertiary,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 1,
    borderRadius: appSizes.Icon.xLarge,
    fontSize: appSizes.Text.regular,
    paddingVertical: 10,
    backgroundColor: appColors.lightBackground,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    flexDirection: "row",
    gap: 5,
  },
  searchInput: {
    flex: 1,
  },
  inputButton: {
    backgroundColor: appColors.lightBgTertiary,
    padding: 5,
    flexShrink: 1,
  },
  searchBarButton: {
    backgroundColor: appColors.lightBackground,
    padding: 10,
    flexShrink: 1,
  },
});

export default PosSearchBar;
