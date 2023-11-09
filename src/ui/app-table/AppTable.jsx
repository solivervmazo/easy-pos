import React, { useCallback, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Animated } from "react-native";
import { appColors, appSizes, appSpacing } from "../../themes";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import SectionHeader from "../SectionHeader";
import TablePagination from "./TablePagination";

const AppTable = ({
  data,
  renderItem = ({ item, toggled }) => {},
  renderActions = ({ actionSize }) => {},
  itemSeparatorComponent = () => {},
  actionsCount = 0,
  keyExtractor = (item) => {},
  tableContainerStyle = {},
  onRowToggle = ({ toggled, setToggled }) => {},
  itemsLength = 0,
  itemsPerPage = 10,
}) => {
  const [rowToggled, setRowToggled] = useState(false);
  const _onRowToggle = useCallback(
    (_onToggle) => {
      setRowToggled(!rowToggled);
      if (_onToggle) _onToggle({ rowToggled, setRowToggled });
    },
    [rowToggled]
  );
  return (
    <View style={{ flex: 1 }}>
      <TableHeader />
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
      <TablePagination itemsLength={itemsLength} itemsPerPage={itemsPerPage} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AppTable;
