import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";
import { AppTableProps, RowItem } from "./types/app-table.types";
import { isKeyValuePair, makeRowData } from "./utils";

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

  const [_currentPage, setCurrentPage] = useState(1);
  const [_filteredData, setFilteredData] = useState([]);

  const _onRowToggle = (toggled: boolean, key: string) => {
    setFilteredData(
      _filteredData.map((row: RowItem) =>
        row.itemKey === key
          ? { ...row, toggled: toggled }
          : { ...row, toggled: false }
      )
    );
    if (onRowToggle) onRowToggle({ toggled: toggled });
  };

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
    const tableData = []
      .concat(data || [])
      .map((row, index) => makeRowData(row, index, itemKey));
    let slicedData = [];
    if (searchStrategy) {
      slicedData = slicedData
        .concat(
          searchStrategy({
            data: tableData.flatMap((row) => row.item),
            searchValue,
          })
        )
        .slice(startSlice, endSlice);
    } else {
      slicedData = slicedData
        .concat(tableData)
        .filter((row: RowItem) => {
          const toSearch =
            typeof searchValue === "number"
              ? searchValue
              : (searchValue || "").toString();

          const src = Object.values(row.item).some((value) => {
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
          renderItem={(item: { item: RowItem }) => {
            const { item: rowItem } = item;
            return (
              <TableRow
                toggleKey={rowItem.itemKey}
                toggled={rowItem.toggled}
                onToggle={({ toggled, toggledKey }) =>
                  _onRowToggle(toggled, toggledKey)
                }
                actionsCount={actionsCount}
                contentStyle={{ flexDirection: "row" }}
                actions={({ actionSize }) =>
                  _renderActions({ actionSize, item: rowItem.item })
                }
                content={() =>
                  _renderItem({
                    item: rowItem.item,
                    toggled: rowItem.toggled,
                  })
                }
                key={`app-table-lists-row-${rowItem.itemKey}`}
              />
            );
          }}
          keyExtractor={(item) =>
            `app-table-lists-flatlist-row-${item.itemKey}`
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
