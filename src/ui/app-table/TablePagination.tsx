import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import {
  appColors,
  appConstants,
  appFonts,
  appSizes,
  appSpacing,
} from "../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import Spacer from "../core/Spacer";
import Icon from "../core/Icon";

const BTN_WIDTH = 40;
const BTN_GAP = 2;

const Btn = (props: {
  selected: boolean;
  renderItem(): React.ReactNode;
  containerStyle?: {} | StyleProp<ViewStyle>;
  onPress(): void;
}) => {
  const { selected, renderItem, containerStyle = {}, onPress } = props;
  const BTN_WIDTH = 40;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={appConstants.ACTIVE_OPACITY}
      style={[
        styles.btnPageContainer,
        selected ? styles.btnPageContainerActive : {},
        {
          width: BTN_WIDTH,
          ...containerStyle,
        },
      ]}
    >
      {renderItem()}
    </TouchableOpacity>
  );
};

const BtnPage = ({ value, selected, onPress }) => {
  return (
    <Btn
      selected={selected}
      onPress={onPress}
      renderItem={() => (
        <Text
          numberOfLines={1}
          ellipsizeMode={"clip"}
          style={[styles.btnPageText, selected ? styles.btnPageTextActive : {}]}
        >
          {value}
        </Text>
      )}
    />
  );
};

const BtnAction = ({ icon, disabled = true, onPress }) => {
  return (
    <Btn
      selected={!disabled}
      onPress={disabled ? null : onPress}
      renderItem={() =>
        Icon.Icons(icon, {
          size: appSizes.Icon.large,
          color: disabled ? appColors.lightTextSecondary : appColors.themeColor,
        })
      }
      containerStyle={{
        width: "auto",
        backgroundColor: appColors.transparent,
      }}
    />
  );
};

const TablePagination = (props: {
  currentPage: number;
  itemsLength: number;
  itemsPerPage: number;
  onChange(args: { page: number }): void;
}) => {
  const {
    currentPage = 0,
    itemsLength = 0,
    itemsPerPage = 10,
    onChange = ({ page }) => {},
  } = props;
  const [_numberOfPages, setNumberOfPages] = useState(1);
  const [_currentPage, setCurrentPage] = useState(currentPage);
  const _flatListRef = useRef();

  const _calculateCumberOfPages = () => {
    const remainder = itemsLength % itemsPerPage;
    const numberOfPages =
      Math.floor((itemsLength - remainder) / itemsPerPage) +
      (remainder ? 1 : 0);
    setNumberOfPages(numberOfPages);
  };

  useEffect(() => {
    _calculateCumberOfPages();
  }, [itemsLength, _currentPage]);

  const _onChange = (page: number) => {
    setCurrentPage(page);
    onChange({ page });
  };

  const _pageControlPressHandle = (args: {
    reduce?: number;
    start?: boolean;
    end?: boolean;
  }) => {
    const { reduce, start, end } = args;
    _onChange(start ? 1 : end ? _numberOfPages : _currentPage + reduce);
  };

  const _pagePressHandle = (args: { page: number }) => {
    const { page = 1 } = args;
    _onChange(page);
  };

  return (
    <View style={{ paddingVertical: 10, alignItems: "center" }}>
      <View style={styles.container}>
        <BtnAction
          icon={"PlayStart"}
          disabled={_currentPage == 1}
          onPress={() => _pageControlPressHandle({ start: true })}
        />
        <BtnAction
          icon={"PlayPrev"}
          disabled={_currentPage < 2}
          onPress={() => _pageControlPressHandle({ reduce: -1 })}
        />
        <FlatList
          scrollToOverflowEnabled={true}
          ref={_flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          getItemLayout={(data, index) => ({
            length: BTN_WIDTH,
            offset: (BTN_WIDTH + BTN_GAP) * index,
            index,
          })}
          data={Array(_numberOfPages)
            .fill(null)
            .map((_, index) => index + 1)
            .filter((item) => item)}
          renderItem={({ item }) => (
            <BtnPage
              onPress={() => _pagePressHandle({ page: item })}
              selected={item == _currentPage}
              value={item}
            />
          )}
          ItemSeparatorComponent={() => <Spacer size={BTN_GAP} />}
        />
        <BtnAction
          icon={"PlayNext"}
          disabled={_currentPage >= _numberOfPages}
          onPress={() => _pageControlPressHandle({ reduce: 1 })}
        />
        <BtnAction
          icon={"PlayEnd"}
          disabled={_currentPage == _numberOfPages}
          onPress={() => _pageControlPressHandle({ end: true })}
        />
      </View>
      <Text style={styles.textPagesOfXLength}>
        {`${_currentPage} of ${_numberOfPages}`}
      </Text>
    </View>
  );
};

export default TablePagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: appSpacing.screenPaddingLeft,
  },
  scrollViewContent: {
    justifyContent: "center",
    flexGrow: 1,
  },
  textPagesOfXLength: {
    fontSize: appSizes.Text.small,
    color: appColors.darkTextTertiary,
  },
  btnPageText: {
    fontSize: appSizes.Text.semiRegular,
    fontFamily: appFonts.regular,
  },
  btnPageTextActive: {
    color: appColors.lightText,
    fontFamily: appFonts.bold,
  },
  btnPageContainer: {
    height: 35,
    borderRadius: 5,
    backgroundColor: appColors.lightBgTertiary,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  btnPageContainerActive: {
    backgroundColor: appColors.themeColor,
  },
});
