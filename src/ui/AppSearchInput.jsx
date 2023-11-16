import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import IconButton from "./IconButton";
import { appColors, appSizes, appSpacing } from "../themes";

const AppSearchInput = ({
  onChange = ({ inputValue }) => {},
  onKeyboardToggle = ({ visible = false }) => {},
  onClearText = () => {},
  value,
  placeholder = "Search",
  inputContainerStyle = {},
  inputSyle = {},
  iconStyle = {},
  iconKeyboardStyle = {},
  iconCloseStyle = {},
  closeIcon = "Close", //Set null to disable
  keyboardIcon = "Keyboard", //Set null to disable
  keyboardOffIcon = "KeyboardOff",
}) => {
  const [inputValue, setValue] = useState(value);
  const [keyboardOff, setKeyboardOff] = useState(false);
  const toggleKeyboardHandle = useCallback(() => {
    if (!keyboardOff) {
      Keyboard.dismiss();
    }
    setKeyboardOff(!keyboardOff);
    onKeyboardToggle({ visible: keyboardOff });
  }, [keyboardOff]);

  const onChangeHandle = (text) => {
    setValue(text);
    onChange({ inputValue: text });
  };

  const onClearHandle = useCallback(() => {
    setValue("");
    onClearText();
  }, []);

  return (
    <View style={[styles.inputContainer, inputContainerStyle]}>
      <TextInput
        value={inputValue}
        onChangeText={onChangeHandle}
        showSoftInputOnFocus={!keyboardOff}
        cursorColor={appColors.themeColor}
        placeholder={placeholder}
        style={[styles.searchInput, inputSyle]}
      />
      {inputValue && closeIcon && (
        <IconButton
          icon={closeIcon}
          size={appSizes.Icon.medium}
          containerStyle={[styles.inputButton, iconStyle, iconCloseStyle]}
          onPress={onClearHandle}
        />
      )}
      {keyboardIcon && (
        <IconButton
          icon={keyboardOff ? keyboardOffIcon || keyboardIcon : keyboardIcon}
          size={appSizes.Icon.medium}
          containerStyle={[styles.inputButton, iconStyle, iconKeyboardStyle]}
          onPress={toggleKeyboardHandle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AppSearchInput;
