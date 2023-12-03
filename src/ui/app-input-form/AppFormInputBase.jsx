import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../IconButton";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";
import { appFormInputArgs } from "./args/appFormInputArgs";
import { Controller } from "react-hook-form";

const AppFormInputBase = (
  args = {
    ...appFormInputArgs,
  }
) => {
  const {
    name = appFormInputArgs.name,
    control = appFormInputArgs.control,
    errors = appFormInputArgs.errors,
    value = appFormInputArgs.value,
    icon = appFormInputArgs.icon,
    label = appFormInputArgs.label,
    valueKey = appFormInputArgs.valueKey,
    returnValue = appFormInputArgs.returnValue,
    renderTextValue = appFormInputArgs.renderTextValue,
    required = appFormInputArgs.required,
    enabled = appFormInputArgs.enabled,
    inputMode = appFormInputArgs.inputMode,
    multiline = appFormInputArgs.multiline,
    placeholder = appFormInputArgs.placeholder,
    hideInput = appFormInputArgs.hideInput,
    renderInput = appFormInputArgs.renderInput,
    renderAction = appFormInputArgs.renderAction,
    onValidate = appFormInputArgs.onValidate,
    containerStyle = appFormInputArgs.containerStyle,
    innerContainerStyle = appFormInputArgs.innerContainerStyle,
    labelStyle = appFormInputArgs.labelStyle,
    inputContainerStyle = appFormInputArgs.inputContainerStyle,
    inputStyle = appFormInputArgs.inputStyle,
    errorTextStyle = appFormInputArgs.errorTextStyle,
    labelContainerStyle = appFormInputArgs.labelContainerStyle,
    labelInnerContainerStyle = appFormInputArgs.labelInnerContainerStyle,
    onFocus = appFormInputArgs.onFocus,
    onBlur = appFormInputArgs.onBlur,
    onChange = appFormInputArgs.onChange,
    focusedLineColor = appFormInputArgs.focusedLineColor,
    defaultLineColor = appFormInputArgs.defaultLineColor,
  } = args;

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
    const _rendered = renderAction();
    if (_rendered) return _rendered;
    return null;
  };

  const _renderErrors = () => {
    return (
      <Text style={[styles.errorText, errorTextStyle]}>{errors?.message}</Text>
    );
  };

  const _setLineColor = (colorValue = _focusedLineColor) => {
    setInputBorderColor(colorValue);
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

  const _renderInput = ({ onChange: _onValidatorChange, value: _value }) => {
    return renderInput({
      ...args,
      $_onValidatorChange: _onValidatorChange,
      $_inputValue: _value,
      $_focusedLineColor: _focusedLineColor,
      $_defaultLineColor: _defaultLineColor,
      $_inputBorderColor: _inputBorderColor,
      $_setLineColor: _setLineColor,
      $_calculateValue: _calculateValue,
    });
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.innerContainer, innerContainerStyle]}>
        <View style={[styles.labelContainer, labelContainerStyle]}>
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
  inputText: {
    fontSize: appSizes.Text.regular,
    borderBottomWidth: 1,
    padding: 3,
  },
  inputTextPlaceholder: {
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

export default AppFormInputBase;
