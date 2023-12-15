import { appColors } from "../../../themes";

class AppendType {
  static text = "text";
  static chip = "chip";
}

export const appFormInputArgs = {
  name: undefined,
  control: undefined,
  errors: undefined,
  value: "",
  icon: "",
  label: "",
  valueKey: undefined,
  returnValue: undefined,
  renderTextValue: (value, text) => text,
  required: false,
  enabled: true,
  placeholder: "",
  hideInput: false,
  renderInput: (props) => {},
  renderAction: () => undefined,
  onValidate: ({ inputValue, errorMessages = [] }) => {},
  containerStyle: {},
  innerContainerStyle: {},
  labelStyle: {},
  inputContainerStyle: {},
  errorTextStyle: {},
  labelContainerStyle: {},
  labelInnerContainerStyle: {},
  focusedLineColor: appColors.themeColor,
  defaultLineColor: appColors.black,
};

export const appFormTextInputArgs = {
  inputMode: "text",
  multiline: false,
  textInputStyle: {},
  onFocus: ({ defaultLineColor, focusedLineColor }) => undefined,
  onBlur: ({ defaultLineColor, focusedLineColor }) => undefined,
  onChange: (value) => value,
};

export const appFormSelectInputArgs = {
  itemLabel: undefined,
  canClear: false,
  multiple: false,
  appendType: AppendType.chip,
  isForm: false,
  inputContainerStyle: {},
  inputSelectionContainerStyle: {},
  togglerContainerStyle: {},
  onSelectPress: () => {},
};
