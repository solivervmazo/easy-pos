import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Text } from "react-native";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import { appColors, appFonts, appSizes, appStyles } from "../../themes";
import { AppTableProps, Item, RowItem } from "./types/app-table.types";
import { isValueFunction, isValueString, makeRowData } from "./utils";

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

  const [toggledKeyState, setToggledKey] = useState<string>("");
  const [currentPageState, setCurrentPage] = useState<number>(1);
  const [filteredDataState, setFilteredData] = useState<RowItem[]>([]);

  // Callback to handle row toggling
  const rowToggleHandle = (
    item: RowItem,
    toggled: boolean,
    key: string
  ): void => {
    if (toggledKeyState === key && !toggled) {
      setToggledKey("");
    } else {
      setToggledKey(key);
    }
    if (onRowToggle) onRowToggle({ toggled: item.item });
  };

  // Callback to handle page change
  const onPageChangeHandle = (page: number): void => {
    setCurrentPage(page);
  };

  // Function to render content when no data is available
  const RenderNoData = (): React.ReactNode => {
    const prerender = renderNoData
      ? isValueString(renderNoData)
        ? renderNoData
        : isValueFunction(renderNoData)
        ? renderNoData()
        : null
      : null;
    const rendered =
      isValueFunction(renderNoData) && !prerender ? "No Data" : prerender;
    return (
      <View style={[styles.noDataContainer, noDataContainerStyle]}>
        {typeof rendered == "string" ? (
          <Text style={[styles.noDataLable, noDataLableStyle]}>{rendered}</Text>
        ) : (
          rendered
        )}
      </View>
    );
  };

  // Function to render the content of each table row
  const RenderItem = ({
    item,
    toggled,
  }: {
    item: Item;
    toggled: boolean;
  }): React.ReactNode => {
    return renderItem ? renderItem({ item, toggled }) : null;
  };

  // Function to render actions for each table row
  const RenderActions = ({
    actionSize,
    item,
  }: {
    actionSize: number;
    item: Item;
  }): React.ReactNode => {
    return renderActions ? renderActions({ actionSize, item }) : null;
  };

  /**
   * Paginate and filter the data based on the current page and search value.
   * @function
   * @name paginateData
   */
  const paginateData = (): void => {
    // Calculate the start and end indices for slicing the data
    const startSlice = itemsPerPage * (currentPageState - 1);
    const endSlice = itemsPerPage * currentPageState;

    // Create an array of table data with unique item keys
    const tableData = (data || [])
      .map<RowItem>((row, index) => makeRowData(row, index, itemKey))
      .map<RowItem>((row) => ({
        ...row,
        toggled: row.itemKey == toggledKeyState,
      }));

    // Initialize an array to store the sliced and filtered data
    let slicedData = [];

    // Check if a custom search strategy is provided
    if (searchStrategy) {
      // Use the custom search strategy to filter the data
      slicedData = slicedData
        .concat(
          searchStrategy({
            data: tableData.flatMap((row) => row.item),
            searchValue,
          })
        )
        .slice(startSlice, endSlice);
    } else {
      // Use the default search strategy (case-insensitive substring match)
      slicedData = slicedData
        .concat(tableData)
        .filter((row: RowItem) => {
          const toSearch =
            typeof searchValue === "number"
              ? searchValue
              : (searchValue || "").toString();

          // Check if any value in the row item includes the search value
          const src = Object.values(row.item).some((value) => {
            return (typeof value === "number" ? value : value || "")
              .toString()
              .toLowerCase()
              .trim()
              .includes(toSearch.trim().toLowerCase());
          });

          // Include the row if any value matches the search value
          return src || false;
        })
        .slice(startSlice, endSlice);
    }
    setFilteredData(slicedData);
  };

  useEffect(() => {
    // Set the filtered data state with the sliced and filtered data
    paginateData();
  }, [currentPageState, data, searchValue]);

  return (
    <View style={{ flex: 1 }}>
      {hasHeader && <TableHeader {...headerOptions} />}
      {itemsLength == 0 && <RenderNoData />}
      {itemsLength > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tableContainerStyle}
          data={filteredDataState}
          renderItem={(item: { item: RowItem }) => {
            const { item: rowItem } = item;
            return (
              <TableRow
                toggleKey={rowItem.itemKey}
                // toggled={rowItem.toggled}
                toggled={rowItem.itemKey == toggledKeyState}
                onToggle={({ toggled, toggledKey }) =>
                  rowToggleHandle(rowItem, toggled, toggledKey)
                }
                actionsCount={actionsCount}
                contentStyle={{ flexDirection: "row" }}
                actions={({ actionSize }) => (
                  <RenderActions actionSize={actionSize} item={rowItem.item} />
                )}
                content={() => (
                  <RenderItem item={rowItem.item} toggled={rowItem.toggled} />
                )}
                key={`app-table-lists-row-${rowItem.itemKey}`}
              />
            );
          }}
          keyExtractor={(item) =>
            `app-table-lists-flatlist-row-${item.itemKey}`
          }
          ItemSeparatorComponent={() =>
            itemSeparatorComponent ? itemSeparatorComponent() : null
          }
        />
      )}
      <TablePagination
        currentPage={currentPageState}
        onChange={({ page }) => onPageChangeHandle(page)}
        itemsLength={filteredDataState.length}
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
