import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  appFormInputArgs,
  appFormSelectInputArgs,
} from "./args/appFormInputArgs";
import AppFormInputBase from "./AppFormInputBase";
import IconButton from "../IconButton";
import { appColors } from "../../themes";
const AppSelectInput = (
  args = {
    ...appFormInputArgs,
    ...appFormSelectInputArgs,
  }
) => {
  const {
    itemLabel = appFormSelectInputArgs.itemLabel,
    canClear = appFormSelectInputArgs.canClear,
    multiple = appFormSelectInputArgs.multiple,
    appendType = appFormSelectInputArgs.appendType,
    isForm = appFormSelectInputArgs.isForm,
    inputContainerStyle = appFormSelectInputArgs.inputContainerStyle,
    inputSelectionContainerStyle = appFormSelectInputArgs.inputSelectionContainerStyle,
    togglerContainerStyle = appFormSelectInputArgs.togglerContainerStyle,
    onSelectPress = appFormSelectInputArgs.onSelectPress,
  } = args;
  const [_state, setState] = useState(null);
  const _onSelectPressHandle = () => {
    onSelectPress();
  };

  const _renderSelectInput = (props) => {
    // setState(props.$_inputValue);
    useEffect(() => {
      props.$_onValidatorChange(props.$_inputValue);
    }, [props.$_inputValue]);
    return (
      <View style={[styles.inputContainer, props.inputContainerStyle]}>
        <View
          style={[
            styles.inputSelectionContainer,
            // props.$_inputValue ? styles.inputSelectionContainerWrap : {},
            props.inputSelectionContainerStyle,
          ]}
        >
          {props.$_inputValue ? (
            <Text style={[styles.inputTextText, styles.inputTextPlaceholder]}>
              {props.$_calculateValue(props.$_inputValue)}
            </Text>
          ) : (
            <Text style={[styles.inputTextText, styles.inputTextPlaceholder]}>
              {props.placeholder}
            </Text>
          )}
        </View>
        <View style={[styles.togglerContainer, props.togglerContainerStyle]}>
          <IconButton
            onPress={_onSelectPressHandle}
            icon={"Down"}
            color={appColors.darkText}
            size={appSizes.Icon.small}
          />
        </View>
      </View>
    );
  };

  return <AppFormInputBase renderInput={_renderSelectInput} {...args} />;
};

export default AppSelectInput;

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    paddingVertical: 2,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: appColors.themeColor,
  },
  inputSelectionContainer: {
    flexGrow: 1,
    alignItems: "center",
    gap: 3,
    flexDirection: "row",
    backgroundColor: appColors.lightBgTertiary,
    minHeight: appSizes.Text.large + 13,
  },
  inputSelectionContainerWrap: {
    flexWrap: "wrap",
  },
  togglerContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 5,
  },
  inputTextText: {
    fontSize: appSizes.Text.regular,
  },
  inputTextInput: {
    borderBottomWidth: 1,
    padding: 3,
  },
  inputTextPlaceholder: {
    color: appColors.lightTextSecondary,
    paddingHorizontal: 5,
  },
});
