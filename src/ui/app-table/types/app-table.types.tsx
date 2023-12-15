import React from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";

/**
 * Represents an object with string, number, or nested object values.
 * @typedef {Object} Obj
 * @property {string | number | Obj} [key] - Key-value pairs with string, number, or nested object values.
 */
export type Obj = {
  [key: string]: string | number | Obj;
};

/**
 * Represents an object, string, or number.
 * @typedef {string | number | Obj} Item
 */
export type Item = Obj | string | number;

/**
 * Represents row item data that is created from @typedef {Item}.
 * @typedef { index: number; itemKey: number | string; selected: boolean; toggled: boolean; item: Obj;} RowItem
 */
export type RowItem = {
  index: number;
  itemKey: string;
  selected: boolean;
  toggled: boolean;
  item: Obj;
};

/**
 * Callback function to render individual items in the table.
 * @callback RenderItemCallback
 * @param {{ item: Item; toggled: boolean }} props - The properties for rendering an item.
 * @returns {React.ReactNode} The rendered React node.
 */
export type RenderItemCallback = {
  (props: { item: Item; toggled: boolean }): React.ReactNode;
};

/**
 * Callback function to render actions for each item.
 * @callback RenderActionsCallback
 * @param {{ actionSize: number; item: Item }} props - The properties for rendering actions.
 * @returns {React.ReactNode} The rendered React node.
 */
export type RenderActionsCallback = {
  (props: { actionSize: number; item: Item }): React.ReactNode;
};

/**
 * Callback function invoked when a row is toggled.
 * @callback OnRowToggleCallback
 * @param {{ toggled: boolean }} props - The properties when a row is toggled.
 * @returns {void}
 */
export type OnRowToggleCallback = {
  (props: { toggled: Obj }): void;
};

/**
 * Callback function for custom search strategies.
 * @callback SearchStrategyCallback
 * @param {{ data: Array<Item>; searchValue: string }} props - The properties for the search strategy.
 * @returns {Array<Item>} The filtered array based on the search strategy.
 */
export type SearchStrategyCallback = {
  (props: { data: Array<Item>; searchValue: string }): Array<Item>;
};

/**
 * Callback function for rendering generic components.
 * @callback RenderCallback
 * @returns {React.ReactNode} The rendered React node.
 */
export type RenderCallback = {
  (): React.ReactNode;
};

/**
 * Callback function for rendering generic components.
 * @callback EventCallback
 */
export type EventCallback = {
  (): void;
};

/**
 * Props for the header of the AppTable component.
 */
export type AppTableHeaderProps = {
  /**
   * Icon for the date filter button. Set to null, undefined, false, or an empty string
   * to remove the date filter. Defaults to "Calendar".
   */
  calendarIcon?: string;

  /**
   * Icon for the more filter button. Set to null, undefined, false, or an empty string
   * to remove more filter buttons. Defaults to "Filters".
   */
  filterIcon?: string;

  /**
   * Icon for the refresh button. Set to null, undefined, false, or an empty string
   * to remove the refresh button. Defaults to "Refresh".
   */
  refreshIcon?: string;

  /**
   * Default text for the date filter when no date is selected. Defaults to "All".
   */
  dateFilterLabel?: string;

  /**
   * Disables the refresh button if set to true. Defaults to false.
   */
  disableRefresh?: boolean;

  /**
   * Disables the more filter button if set to true. Defaults to false.
   */
  disableFilter?: boolean;

  /**
   * Disables the date range picker button if set to true. Defaults to false.
   */
  disableDaterangePicker?: boolean;

  /**
   * Hides other actions in the header excepts filters. Defaults to false.
   */
  searchMode?: boolean;

  /**
   * Callback event when the date filter button is pressed.
   */
  onDateFilterPress?: EventCallback;

  /**
   * Callback event when the more filter button is pressed.
   */
  onFilterPress?: EventCallback;

  /**
   * Callback event when the refresh button is pressed.
   */
  onRefreshPress?: EventCallback;

  /**
   * Callback function to render additional header action buttons.
   * @returns {React.ReactNode} - The React element representing additional header action buttons.
   */
  renderHeaderActions?(): React.ReactNode;

  /**
   * Styles for the container of the header action area.
   */
  actionsContainerStyle?: StyleProp<ViewStyle>;
};

/**
 * Props for the AppTable component.
 */
export type AppTableProps = {
  /**
   * An array containing the data to be displayed in the table.
   */
  data: Array<Obj | string | number>;

  /**
   * The key to be used as a unique identifier for each item in the data array.
   * If not provided, the index will be used. Use this when the data is a list of values instead of key-value pairs.
   */
  itemKey?: string;

  /**
   * The search string used to filter the table. Defaults to an empty string.
   */
  searchValue: string;

  /**
   * The total number of items in the data array. Provide this beforehand for pagination to work.
   */
  itemsLength: number;

  /**
   * The number of items to display per page. Defaults to 10.
   */
  itemsPerPage: number;

  /**
   * Determines whether to show the table header, including table actions such as refresh, date range filter, more filters, and custom actions.
   */
  hasHeader: boolean;

  /**
   * A custom search strategy function for filtering data before pagination.
   * @param {Object} props - The properties for the search strategy.
   * @param {Array<Item>} props.data - The data array to be filtered.
   * @param {string} props.searchValue - The search string to filter the data.
   * @returns {Array<Item>} The filtered array based on the search strategy.
   */
  searchStrategy: SearchStrategyCallback;

  /**
   * A callback function to render individual items in the table.
   * @param {Object} props - The properties for rendering an item.
   * @param {Item} props.item - The item to be rendered.
   * @param {boolean} props.toggled - Indicates whether the row is toggled.
   * @returns {React.ReactNode} The rendered React node.
   */
  renderItem: RenderItemCallback;

  /**
   * A callback function to render content when there is no data to display.
   * @returns {React.ReactNode} The rendered React node or a string indicating no data.
   */
  renderNoData?: string | RenderCallback;

  /**
   * A callback function to render additional actions for each item.
   * @param {Object} props - The properties for rendering actions.
   * @param {number} props.actionSize - The size of the action button.
   * @param {Item} props.item - The item for which actions are rendered.
   * @returns {React.ReactNode} The rendered React node.
   */
  renderActions?: RenderActionsCallback;

  /**
   * A callback function to render a separator between items.
   * @returns {React.ReactNode} The rendered React node.
   */
  itemSeparatorComponent: RenderCallback;

  /**
   * The number of actions available for each item. This is required to set the needed width for the toggle component.
   * The action button size is set to 42 by 42.
   */
  actionsCount: number;

  /**
   * Style for the container of the entire table. Corresponds to the FlatList `contentContainerStyle`.
   */
  tableContainerStyle: StyleProp<ViewStyle>;

  /**
   * Style for the container when there is no data to display.
   */
  noDataContainerStyle: StyleProp<ViewStyle>;

  /**
   * Style for the label when there is no data to display.
   */
  noDataLableStyle: StyleProp<TextStyle>;

  /**
   * Callback function when a row in the table is toggled.
   * @param {Object} props - The properties when a row is toggled.
   * @param {boolean} props.toggled - Indicates whether the row is toggled.
   * @returns {void}
   */
  onRowToggle: OnRowToggleCallback;

  /**
   * Options for customizing the header of the table.
   */
  headerOptions: AppTableHeaderProps;
};
