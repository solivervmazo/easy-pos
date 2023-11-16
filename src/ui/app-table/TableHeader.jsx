import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { appColors, appSizes } from "../../themes";
import IconButton from "../IconButton";
import ChipButton from "../ChipButton";
const TableHeader = ({
  calendarIcon = "Calendar", // set null to disable
  filterIcon = "Filters", // set null to disable
  refreshIcon = "Refresh", // set null to disable
  onDateFilterPress = () => undefined,
  onFilterPress = () => {},
  onRefreshPress = () => {},
  renderHeaderActions = () => undefined,
  dateFilterLabel = "All",
  actionsContainerStyle = {},
}) => {
  const onShowDateFilterHandle = () => {
    // router.push({ pathname: "items/filterDate" });
    onDateFilterPress();
  };

  const onRefreshHandle = () => {
    onRefreshPress();
  };

  const onFilterHandle = () => {
    onFilterPress();
  };

  const _renderHeaderActions = () => {
    const _rendered = renderHeaderActions();
    return _rendered || null;
  };

  return (
    <View style={[styles.headerContainer]}>
      <View style={[styles.mainActionsContainer]}>
        {refreshIcon && (
          <IconButton
            icon={refreshIcon}
            size={appSizes.Icon.large}
            onPress={onRefreshHandle}
          />
        )}
        <View style={[styles.mainActionsContainer, actionsContainerStyle]}>
          {_renderHeaderActions()}
        </View>
      </View>
      <View style={styles.subActionsContainer}>
        {calendarIcon && (
          <ChipButton
            onPress={onShowDateFilterHandle}
            buttonRight={() => (
              <IconButton
                disabled
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
            icon={filterIcon}
            size={appSizes.Icon.large}
            onPress={onFilterHandle}
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
