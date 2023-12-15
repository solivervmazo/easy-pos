import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  appFormInputArgs,
  appFormTextInputArgs,
} from "./args/appFormInputArgs";
import AppFormInputBase from "./AppFormInputBase";
import { TextInput } from "react-native-gesture-handler";
const AppTextInput = (
  args = {
    ...appFormInputArgs,
    ...appFormTextInputArgs,
  }
) => {
  const {
    inputMode = appFormTextInputArgs.inputMode,
    multiline = appFormTextInputArgs.multiline,
    textInputStyle = appFormTextInputArgs.textInputStyle,
    onFocus = appFormTextInputArgs.onChange,
    onBlur = appFormTextInputArgs.onBlur,
    onChange = appFormTextInputArgs.onChange,
  } = args;
  const _onFocusHandle = (
    defaultLineColor,
    focusedLineColor,
    setLineColor = (colorValue) => colorValue
  ) => {
    onFocus({
      defaultLineColor,
      focusedLineColor,
    });
    setLineColor(focusedLineColor);
  };

  const _onBlurHandle = (
    defaultLineColor,
    focusedLineColor,
    setLineColor = (colorValue) => colorValue
  ) => {
    onBlur({
      defaultLineColor,
      focusedLineColor,
    });
    setLineColor(defaultLineColor);
  };

  const _onChangeHandle = (inputValue, validatorHandle = (v) => v) => {
    validatorHandle(inputValue);
    onChange(inputValue);
  };

  const _renderSelectInput = (props) => {
    return (
      <TextInput
        value={props.$_calculateValue(props.$_inputValue)}
        editable={props.$enabled}
        onFocus={() =>
          _onFocusHandle(
            props.$_defaultLineColor,
            props.$_focusedLineColor,
            props.$_setLineColor
          )
        }
        onBlur={() =>
          _onBlurHandle(
            props.$_defaultLineColor,
            props.$_focusedLineColor,
            props.$_setLineColor
          )
        }
        multiline={multiline}
        onChange={(e) =>
          _onChangeHandle(e.nativeEvent.text, props.$_onValidatorChange)
        }
        cursorColor={appColors.black}
        style={[
          styles.textInput,
          textInputStyle,
          {
            borderColor: props.$_inputBorderColor,
            backgroundColor: props.enabled
              ? undefined
              : appColors.lightBgTertiary,
          },
        ]}
        inputMode={inputMode}
        placeholder={props.placeholder}
      />
    );
  };

  return <AppFormInputBase renderInput={_renderSelectInput} {...args} />;
};

export default AppTextInput;

const styles = StyleSheet.create({
  textInput: {
    fontSize: appSizes.Text.regular,
    borderBottomWidth: 1,
    padding: 3,
  },
});
