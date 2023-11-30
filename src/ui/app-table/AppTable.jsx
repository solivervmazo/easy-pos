import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";

const AppTable = ({
  data,
  itemKey,
  renderItem = ({ item, toggled }) => null,
  renderNoData = () => undefined,
  renderActions = ({ actionSize, item }) => {},
  itemSeparatorComponent = () => {},
  actionsCount = 0,
  keyExtractor = (item) => {},
  tableContainerStyle = {},
  noDataContainerStyle = {},
  noDataLableStyle = {},
  onRowToggle = ({ toggled }) => {},
  itemsLength = 0,
  itemsPerPage = 10,
  hasHeader = true,
  headerOptions = {
    calendarIcon: "Calendar", // set null to disable
    filterIcon: "Filters", // set null to disable
    refreshIcon: "Refresh", // set null to disable
    onDateFilterPress: () => undefined,
    onFilterPress: () => {},
    onRefreshPress: () => {},
    renderHeaderActions: () => undefined,
    dateFilterLabel: "All",
    actionsContainerStyle: {},
  },
}) => {
  const [rowToggled, setRowToggled] = useState(false);
  const [_rowToggledKey, setRowToggledKey] = useState(undefined);
  const _onRowToggle = useCallback(
    (_toggled, key) => {
      if (_toggled == false) {
        if (key === _rowToggledKey) setRowToggledKey(undefined);
      } else {
        setRowToggledKey(key);
      }
      if (onRowToggle) onRowToggle({ toggled: _toggled });
    },
    [_rowToggledKey]
  );

  const _renderNoData = () => {
    const _rendered = renderNoData();
    return (
      <View style={[styles.noDataContainer, noDataContainerStyle]}>
        {_rendered || (
          <Text style={[styles.noDataLable, noDataLableStyle]}>No data</Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {hasHeader && <TableHeader {...headerOptions} />}
      {_renderNoData()}
      {itemsLength > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...tableContainerStyle }}
          data={data}
          renderItem={({ item }) => (
            <TableRow
              toggleKey={item[itemKey]}
              toggled={_rowToggledKey == item[itemKey]}
              onToggle={({ toggled, toggledKey }) =>
                _onRowToggle(toggled, item[itemKey])
              }
              actionsCount={actionsCount}
              contentStyle={{ flexDirection: "row" }}
              actions={({ actionSize }) => renderActions({ actionSize, item })}
              content={() =>
                renderItem({ item, toggled: _rowToggledKey == item[itemKey] })
              }
              key={`app-table-lists-row-${item[itemKey]}`}
            />
          )}
          keyExtractor={(item) =>
            `app-table-lists-flatlist-row-${item[itemKey]}`
          }
          ItemSeparatorComponent={() => itemSeparatorComponent()}
        />
      )}
      <TablePagination itemsLength={itemsLength} itemsPerPage={itemsPerPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: { alignItems: "center", justifyContent: "center", flex: 1 },
  noDataLable: {
    color: appColors.lightTextSecondary,
    fontSize: appSizes.Text.large,
    fontFamily: appFonts.medium,
    ...appStyles.textLightShadow,
  },
});

export default AppTable;
