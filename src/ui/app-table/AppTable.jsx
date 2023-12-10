import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";

const AppTable = ({
  data,
  itemKey,
  searchValue = "",
  renderItem = ({ item, toggled }) => null,
  renderNoData = () => undefined,
  renderActions = ({ actionSize, item }) => {},
  itemSeparatorComponent = () => null,
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
  const [_currentPage, setCurrentPage] = useState(1);
  const [_filteredData, setFilteredData] = useState([]);

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

  const _onPageChangeHandle = (page) => {
    setCurrentPage(page);
  };

  const _renderNoData = () => {
    const _check =
      typeof renderNoData == "string" ? renderNoData : renderNoData();
    const _rendered =
      typeof renderNoData == "function" && !_check ? "No Data" : _check;
    return (
      <View style={[styles.noDataContainer, noDataContainerStyle]}>
        {typeof _rendered == "string" ? (
          <Text style={[styles.noDataLable, noDataLableStyle]}>
            {_rendered}
          </Text>
        ) : (
          _rendered
        )}
      </View>
    );
  };

  const _paginateData = () => {
    const startSlice = itemsPerPage * (_currentPage - 1);
    const endSlice = itemsPerPage * _currentPage;
    const slicedData = []
      .concat(data || [])
      .slice(startSlice, endSlice)
      .filter((row) => {
        const toSearch =
          typeof searchValue === "number"
            ? searchValue
            : (searchValue || "").toString().trim();
        const src = Object.values(row).some((value) =>
          (typeof value === "number" ? value : value || "")
            .toString()
            .includes(toSearch)
        );
        return src || false;
      });
    setFilteredData(slicedData || []);
  };

  useEffect(() => {
    _paginateData();
  }, [_currentPage, data, searchValue]);

  return (
    <View style={{ flex: 1 }}>
      {hasHeader && <TableHeader {...headerOptions} />}
      {itemsLength == 0 && _renderNoData()}
      {itemsLength > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ ...tableContainerStyle }}
          data={_filteredData}
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
      <TablePagination
        currentPage={_currentPage}
        onChange={({ page }) => _onPageChangeHandle(page)}
        itemsLength={_filteredData.length}
        itemsPerPage={itemsPerPage}
      />
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
