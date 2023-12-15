import { Obj, RowItem } from "../types/app-table.types";

export const isValueString = (value: any): value is string => {
  return typeof value === "string" && value.length > 0;
};

export const isValueFunction = (value: any): value is Function => {
  return typeof value === "function";
};

export const isKeyValuePair = (value: any): value is Obj => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const makeRowData = (
  value: any,
  index: number,
  itemKey?: string
): RowItem => ({
  index: 0,
  itemKey: itemKey ? value[itemKey] : index.toString(),
  selected: false,
  toggled: false,
  item: isKeyValuePair(value) ? value : { value },
});
