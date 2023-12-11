import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";
import { AppTableProps } from "./types/app-table.types";

const AppTable = forwardRef<unknown, AppTableProps>((props, _) => {
  const {
    data,
    itemKey,
    searchValue = "",
    itemsLength = 0,
    itemsPerPage = 10,
    hasHeader = true,
    actionsCount = 0,
    tableContainerStyle,
    noDataContainerStyle,
    noDataLableStyle,
    onRowToggle,
    searchStrategy,
    renderItem,
    renderNoData,
    renderActions,
    itemSeparatorComponent,
    headerOptions,
  } = props;

  const [_rowToggledKey, setRowToggledKey] = useState(undefined);
  const [_currentPage, setCurrentPage] = useState(1);
  const [_filteredData, setFilteredData] = useState([]);

  const _onRowToggle = useCallback(
    (toggled: boolean, key: number) => {
      !toggled && key == _rowToggledKey
        ? setRowToggledKey(undefined)
        : setRowToggledKey(key);
      if (onRowToggle) onRowToggle({ toggled: toggled });
    },
    [_rowToggledKey]
  );

  const _onPageChangeHandle = (page: number) => {
    setCurrentPage(page);
  };

  const _renderNoData = () => {
    const _check = renderNoData
      ? typeof renderNoData == "string"
        ? renderNoData
        : renderNoData()
      : null;
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

  const _renderItem = ({ item, toggled }) => {
    return renderItem ? renderItem({ item, toggled }) : null;
  };

  const _renderActions = ({ actionSize, item }) => {
    return renderActions ? renderActions({ actionSize, item }) : null;
  };

  const _paginateData = () => {
    const startSlice = itemsPerPage * (_currentPage - 1);
    const endSlice = itemsPerPage * _currentPage;
    let slicedData = [];
    if (searchStrategy) {
      slicedData = slicedData
        .concat(searchStrategy({ data: data || [], searchValue }))
        .slice(startSlice, endSlice);
    } else {
      slicedData = slicedData
        .concat(data || [])
        .filter((row) => {
          const toSearch =
            typeof searchValue === "number"
              ? searchValue
              : (searchValue || "").toString();
          const src = Object.values(row).some((value) => {
            return (typeof value === "number" ? value : value || "")
              .toString()
              .toLowerCase()
              .trim()
              .includes(toSearch.trim().toLowerCase());
          });
          return src || false;
        })
        .slice(startSlice, endSlice);
    }

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
          contentContainerStyle={tableContainerStyle}
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
              actions={({ actionSize }) => _renderActions({ actionSize, item })}
              content={() =>
                _renderItem({ item, toggled: _rowToggledKey == item[itemKey] })
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
});

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
