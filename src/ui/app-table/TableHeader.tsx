import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors, appSizes } from "../../themes";
import IconButton from "../IconButton";
import ChipButton from "../ChipButton";
import { AppTableHeaderProps } from "./types/app-table.types";
const TableHeader = (props: AppTableHeaderProps) => {
  const {
    calendarIcon = "Calendar",
    filterIcon = "Filters",
    refreshIcon = "Refresh",
    disableRefresh = false,
    disableFilter = false,
    disableDaterangePicker = false,
    dateFilterLabel = "All",
    searchMode = false,
    onDateFilterPress,
    onFilterPress,
    onRefreshPress,
    renderHeaderActions,
    actionsContainerStyle = {},
  } = props;
  const _onShowDateFilterHandle = () => {
    onDateFilterPress && onDateFilterPress();
  };

  const _onRefreshHandle = () => {
    onRefreshPress && onRefreshPress();
  };

  const _onFilterHandle = () => {
    onFilterPress && onFilterPress();
  };

  const _renderHeaderActions = () => {
    const rendered = renderHeaderActions();
    return rendered || null;
  };

  return (
    <View style={[styles.headerContainer]}>
      <View style={[styles.mainActionsContainer]}>
        {refreshIcon && (
          <IconButton
            disabled={disableRefresh}
            icon={refreshIcon}
            size={appSizes.Icon.large}
            onPress={_onRefreshHandle}
          />
        )}
        {!searchMode && (
          <View style={[styles.mainActionsContainer, actionsContainerStyle]}>
            {_renderHeaderActions()}
          </View>
        )}
      </View>
      <View style={styles.subActionsContainer}>
        {calendarIcon && (
          <ChipButton
            disabled={disableDaterangePicker}
            onPress={_onShowDateFilterHandle}
            buttonRight={() => (
              <IconButton
                disabled
                onPress={() => {}}
                icon={"Calendar"}
                size={appSizes.Icon.medium}
                containerStyle={[styles.dateRangeFilterIconContainer]}
              />
            )}
            label={dateFilterLabel}
            containerStyle={[styles.dateRangeFilterChipContainer]}
            labelStyle={[styles.dateRangeFilterLabel]}
          />
        )}
        {filterIcon && (
          <IconButton
            disabled={disableFilter}
            icon={filterIcon}
            size={appSizes.Icon.large}
            onPress={_onFilterHandle}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 7,
    flexDirection: "row",
    paddingVertical: 8,
  },
  mainActionsContainer: {
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subActionsContainer: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  dateRangeFilterIconContainer: { backgroundColor: appColors.lightBackground },
  dateRangeFilterChipContainer: {
    borderRadius: appSizes.Icon.large,
    backgroundColor: appColors.lightBgTertiary,
  },
  dateRangeFilterLabel: {
    color: appColors.darkText,
  },
});

export default TableHeader;
