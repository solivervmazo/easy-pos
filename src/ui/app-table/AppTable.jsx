import React, { useCallback, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";

const AppTable = ({
  data,
  renderItem = ({ item, toggled }) => {},
  renderNoData = () => undefined,
  renderActions = ({ actionSize }) => {},
  itemSeparatorComponent = () => {},
  actionsCount = 0,
  keyExtractor = (item) => {},
  tableContainerStyle = {},
  noDataContainerStyle = {},
  noDataLableStyle = {},
  onRowToggle = ({ toggled, setToggled }) => {},
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
  const _onRowToggle = useCallback(
    (_onToggle) => {
      setRowToggled(!rowToggled);
      if (_onToggle) _onToggle({ rowToggled, setRowToggled });
    },
    [rowToggled]
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
              toggled={rowToggled}
              onToggle={({ rowToggled, setRowToggled }) =>
                _onRowToggle(onRowToggle)
              }
              actionsCount={actionsCount}
              contentStyle={{ flexDirection: "row" }}
              actions={({ actionSize }) => renderActions({ actionSize })}
              content={() => renderItem({ item, rowToggled })}
            />
          )}
          keyExtractor={(item) => keyExtractor(item)}
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
