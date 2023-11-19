import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "./IconButton";
import ChipButton from "./ChipButton";
import { appColors, appFonts, appSizes, appStyles } from "../themes";
import { TextInput } from "react-native-gesture-handler";

const AppFormInputText = ({
  value = "",
  icon = "",
  label = "",
  required = false,
  enabled = true,
  inputMode = "text",
  placeholder = "",
  renderAction = ({ inputRef }) => undefined,
  onValidate = ({ inputValue, errorMessages = [] }) => {},
  containerStyle = {},
  innerContainerStyle = {},
  labelStyle = {},
  inputContainerStyle = {},
  inputStylye = {},
  errorTextStyle = {},
  onFocus = ({ defaultLineColor, focusedLineColor }) => undefined,
  onBlur = ({ defaultLineColor, focusedLineColor }) => undefined,
  focusedLineColor = appColors.themeColor,
  defaultLineColor = appColors.black,
}) => {
  const _inputRef = useRef(null);
  const [_inputValue, setInputValue] = useState(value);
  const [_errors, setError] = useState([]);
  const [_focusedLineColor, setFocusedLineColor] = useState(focusedLineColor);
  const [_defaultLineColor, setDefaultLineColor] = useState(defaultLineColor);
  const [_inputBorderColor, setInputBorderColor] = useState(defaultLineColor);

  const _icon = () => {
    if (icon)
      return (
        <IconButton
          containerStyle={{}}
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
    if (_errors.length > 0)
      return <Text style={[styles.errorText, errorTextStyle]}>Error</Text>;
    return null;
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

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.innerContainer, innerContainerStyle]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {_icon()}
            <Text style={[styles.label, labelStyle]}>
              {label}
              {_required()}
            </Text>
          </View>
          {_renderAction()}
        </View>
        <View style={[styles.inputContainer, inputContainerStyle]}>
          <TextInput
            ref={_inputRef}
            editable={enabled}
            onFocus={_onFocus}
            onBlur={_onBlur}
            cursorColor={appColors.black}
            style={[
              styles.input,
              inputStylye,
              { borderColor: _inputBorderColor },
            ]}
            inputMode={inputMode}
            placeholder={placeholder}
          />
          {_renderErrors()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainerStyle: {
    paddingVertical: 10,
    borderRadius: appSizes.Text.regular,
  },
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

export default AppFormInputText;
