import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { View, Text } from "react-native";
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

const Btn = ({ renderItem = () => {}, containerStyle = {}, onPress }) => {
  const BTN_WIDTH = 40;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={appConstants.ACTIVE_OPACITY}
      style={{
        width: BTN_WIDTH,
        height: 35,
        borderRadius: 5,
        backgroundColor: appColors.lightBgTertiary,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        ...containerStyle,
      }}
    >
      {renderItem()}
    </TouchableOpacity>
  );
};

const BtnPage = ({ value }) => {
  return (
    <Btn
      renderItem={() => (
        <Text
          numberOfLines={1}
          ellipsizeMode={"clip"}
          style={{
            fontSize: appSizes.Text.semiRegular,
            fontFamily: appFonts.regular,
          }}
        >
          {value}
        </Text>
      )}
    />
  );
};

const BtnAction = ({ icon, disabled = true }) => {
  return (
    <Btn
      onPress={disabled ? null : () => {}}
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

const TablePagination = ({
  itemsLength = 0,
  itemsPerPage = 10,
  onPress = ({ page }) => {},
}) => {
  const { numberOfPages } = (() => {
    const remainder = itemsLength % itemsPerPage;
    const numberOfPages = Math.floor(itemsLength / itemsPerPage) + remainder;
    return { numberOfPages };
  })();
  return (
    <View style={{ paddingVertical: 10, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: appSpacing.screenPaddingLeft,
        }}
      >
        <BtnAction icon={"PlayStart"} />
        <BtnAction icon={"PlayPrev"} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: BTN_WIDTH,
            offset: (BTN_WIDTH + BTN_GAP) * index,
            index,
          })}
          data={Array(numberOfPages)
            .fill(null)
            .map((_, index) => index)
            .filter((item) => item)}
          renderItem={({ item }) => <BtnPage value={item} />}
          ItemSeparatorComponent={() => <Spacer size={BTN_GAP} />}
        />
        <BtnAction icon={"PlayNext"} />
        <BtnAction icon={"PlayEnd"} />
      </View>
      <Text
        style={{
          fontSize: appSizes.Text.small,
          color: appColors.darkTextTertiary,
        }}
      >
        {`${1} of ${numberOfPages}`}
      </Text>
    </View>
  );
};

export default TablePagination;
