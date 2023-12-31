import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../IconButton";
import ChipButton from "../ChipButton";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";
import { TextInput } from "react-native-gesture-handler";
import AppInputSelect from "./app-input-select/AppInputSelect";

import { Controller } from "react-hook-form";

class InputType {
  static text = "text";
  static select = "select";
}

const AppFormInput = ({
  name,
  control,
  errors,
  value = "",
  icon = "",
  label = "",
  valueKey,
  inputType = InputType.text,
  returnValue,
  renderTextValue = (value, text) => text,
  required = false,
  enabled = true,
  inputMode = "text",
  multiline = false,
  placeholder = "",
  hideInput = false,
  renderAction = ({ inputRef }) => undefined,
  onValidate = ({ inputValue, errorMessages = [] }) => {},
  containerStyle = {},
  innerContainerStyle = {},
  labelStyle = {},
  inputContainerStyle = {},
  inputStyle = {},
  errorTextStyle = {},
  labelContainerStyle = {},
  labelInnerContainerStyle = {},
  onFocus = ({ defaultLineColor, focusedLineColor }) => undefined,
  onBlur = ({ defaultLineColor, focusedLineColor }) => undefined,
  onChange = (value) => value,
  focusedLineColor = appColors.themeColor,
  defaultLineColor = appColors.black,
}) => {
  const _inputRef = useRef(null);
  const [_focusedLineColor, setFocusedLineColor] = useState(focusedLineColor);
  const [_defaultLineColor, setDefaultLineColor] = useState(defaultLineColor);
  const [_inputBorderColor, setInputBorderColor] = useState(defaultLineColor);

  const _icon = () => {
    if (icon)
      return (
        <IconButton
          containerStyle={{
            paddingHorizontal: 0,
            padding: 0,
            marginEnd: 5,
          }}
          icon={icon}
          plain={true}
          disabled={true}
          size={appSizes.Icon.medium}
        />
      );
    return null;
  };

  const _required = () => {
    if (required) return <Text style={styles.labelAsterisk}>{` *`}</Text>;
    return null;
  };

  const _renderAction = () => {
    const _rendered = renderAction({ inputRef: _inputRef });
    if (_rendered) return _rendered;
    return null;
  };

  const _renderErrors = () => {
    return (
      <Text style={[styles.errorText, errorTextStyle]}>{errors?.message}</Text>
    );
  };

  const _onFocus = () => {
    onFocus({
      defaultLineColor: _defaultLineColor,
      focusedLineColor: _focusedLineColor,
    });
    setInputBorderColor(_focusedLineColor);
  };

  const _onBlur = () => {
    onBlur({
      defaultLineColor: _defaultLineColor,
      focusedLineColor: _focusedLineColor,
    });
    setInputBorderColor(_defaultLineColor);
  };

  const _onChangeHandle = (_value, validatorHandle = (v) => {}) => {
    let newValue = _value;
    // if (inputMode === "numeric") newValue = _value.replace(/[^0-9]/g, "");
    validatorHandle(newValue);
    onChange(newValue);
  };

  const _calculateValue = (_value) => {
    let calculatedValue = undefined;
    if (typeof _value === "string") calculatedValue = _value.toString();
    else if (typeof _value === "object" && !Array.isArray(_value)) {
      calculatedValue = valueKey
        ? _value[valueKey]
        : undefined; /**Missing valueKey typeof value is object */
    } else {
      /**value of AppFormInput is not valid should either string | object */
    }
    return renderTextValue(value, calculatedValue);
  };

  const _renderInputTypeText = ({ onChange, value: _value, args = {} }) => {
    return (
      <TextInput
        value={_calculateValue(_value)}
        ref={_inputRef}
        editable={enabled}
        onFocus={_onFocus}
        onBlur={_onBlur}
        multiline={multiline}
        onChange={(e) => _onChangeHandle(e.nativeEvent.text, onChange)}
        cursorColor={appColors.black}
        style={[
          styles.input,
          inputStyle,
          {
            ...(args?.display ? { display: args.display } : {}),
            borderColor: _inputBorderColor,
            backgroundColor: enabled ? undefined : appColors.lightBgTertiary,
          },
        ]}
        inputMode={inputMode}
        placeholder={placeholder}
        {...args}
      />
    );
  };

  const _renderInputTypeSelect = ({ onChange, value: _value }) => {
    const args = {
      editable: false,
      display: "none",
    };
    return (
      <>
        <AppInputSelect isForm={true} containerStyle={{}} />

        {_renderInputTypeText({ onChange, value: _value, args })}
      </>
    );
  };

  const _renderInput = ({ onChange, value: _value }) => {
    if (inputType == InputType.text) {
      return _renderInputTypeText({ onChange, value: _value });
    } else if (inputType == InputType.select) {
      return _renderInputTypeSelect({ onChange, value: _value });
    }
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.innerContainer, innerContainerStyle]}>
        <View style={[styles.labelContainer]}>
          <View style={[styles.labelInnerContainer, labelInnerContainerStyle]}>
            {_icon()}
            <Text style={[styles.label, labelStyle]}>
              {label}
              {_required()}
            </Text>
          </View>
          {_renderAction()}
        </View>
        {!hideInput && (
          <View style={[styles.inputContainer, inputContainerStyle]}>
            {control && name ? (
              <Controller
                name={name}
                control={control}
                render={({ field: { onChange, _ } }) => {
                  return _renderInput({ onChange, value });
                }}
              />
            ) : (
              _renderInput({ onChange: () => {}, value })
            )}
            {errors && _renderErrors()}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainerStyle: {
    paddingVertical: 10,
    borderRadius: appSizes.Text.regular,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  labelInnerContainer: { flex: 1, flexDirection: "row", alignItems: "center" },
  label: {
    fontFamily: appFonts.medium,
    fontSize: appSizes.Text.regular,
    ...appStyles.textLightShadow,
  },
  labelAsterisk: { color: appColors.lightDanger },
  inputContainer: {
    marginStart: 25,
  },
  input: {
    fontSize: appSizes.Text.regular,
    borderBottomWidth: 1,
    padding: 3,
  },
  errorText: {
    color: appColors.lightDanger,
    fontFamily: appFonts.medium,
    fontSize: appSizes.Text.semiRegular,
    ...appStyles.textLightShadow,
  },
});

export default AppFormInput;
