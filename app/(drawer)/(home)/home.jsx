import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  appColors,
  appFonts,
  appSizes,
  appSpacing,
  appStyles,
} from "../../../src/themes";
import { Spacer, SectionHeader, ChipButton } from "../../../src/ui";
import Icon from "../../../src/ui/core/Icon";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import PosQuickMode from "../../../src/components/pos/shared/PosQuickMode";
const TR = [
  {
    id: 1,
    trNumber: "1000-90-909-01",
    trType: "sales",
    amount: 200,
    trDate: "November 5, 2023",
  },
  {
    id: 2,
    trNumber: "1000-90-90902",
    trType: "sales",
    amount: 130,
    trDate: "November 5, 2023",
  },
  {
    id: 3,
    trNumber: "1000-90-909-03",
    trType: "returns",
    amount: 240,
    trDate: "November 5, 2023",
  },
  {
    id: 4,
    trNumber: "1000-90-909-04",
    trType: "returns",
    amount: 40,
    trDate: "November 5, 2023",
  },

  {
    id: 5,
    trNumber: "1000-90-909-05",
    trType: "returns",
    amount: "1,240",
    trDate: "November 5, 2023",
  },
];

const TransactionRowCard = ({ item }) => {
  const { trType, trDate, trNumber, amount } = item;
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          flexGrow: 1,
          borderRadius: appSizes.Icon.regular,
          backgroundColor: appColors.lightBgTertiary,
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View
          style={{
            borderRadius: appSizes.Icon.large,
            backgroundColor: appColors.lightBgSecondary,
            padding: 8,
          }}
        >
          {Icon.Icons(trType === "sales" ? "Receipt" : "ReceiptReturns", {
            size: appSizes.Icon.large,
            color: appColors.themeColorTertiary,
          })}
        </View>
        <Spacer size={8} />
        <View style={{ flexGrow: 1 }}>
          <Text
            style={{
              color: appColors.themeColor,
              fontSize: appSizes.Text.regular,
              fontFamily: appFonts.medium,
              textTransform: "capitalize",
              ...appStyles.textLightShadow,
            }}
          >
            {trType}
          </Text>
          <Text
            style={{
              color: appColors.lightTextTertiary,
              fontSize: appSizes.Text.small,
              fontFamily: appFonts.regular,
              textTransform: "capitalize",
              ...appStyles.textLightShadow,
            }}
          >
            {trDate}
          </Text>
        </View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Text
            style={{
              color:
                trType === "sales"
                  ? appColors.lightSuccess
                  : appColors.lightDanger,
              fontSize: appSizes.Text.regular,
              fontFamily: appFonts.bold,
              textTransform: "capitalize",
              ...appStyles.textLightShadow,
            }}
          >
            {(trType === "sales" ? "+" : "-") + amount}
          </Text>
          <Text
            style={{
              color: appColors.lightTextTertiary,
              fontSize: appSizes.Text.small,
              fontFamily: appFonts.regular,
              textTransform: "capitalize",
              ...appStyles.textLightShadow,
            }}
          >
            #{trNumber}
          </Text>
        </View>
      </View>
    </View>
  );
};

const DashboardEarningsCard = () => {
  return (
    <View
      style={{
        backgroundColor: appColors.lightSuccessSecondary,
        flex: 1,
        borderRadius: 15,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              color: appColors.themeColor,
              fontSize: appSizes.Text.regular,
              fontFamily: appFonts.medium,
              ...appStyles.textLightShadow,
            }}
          >
            Today's earnings
          </Text>
        </View>
        <View
          style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Icon.OpenLink />
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: appColors.themeColor,
            fontSize: appSizes.Text.large,
            fontFamily: appFonts.bold,
            ...appStyles.textLightShadow,
            textAlign: "center",
          }}
        >
          $ 6.7K
        </Text>
      </View>
    </View>
  );
};

const DashboardCashOnHandCard = () => {
  return (
    <View
      style={{
        backgroundColor: appColors.lightPrimarySecondary,
        flex: 1,
        borderRadius: 15,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              color: appColors.themeColor,
              fontSize: appSizes.Text.regular,
              fontFamily: appFonts.medium,
              ...appStyles.textLightShadow,
            }}
          >
            Cash on hand
          </Text>
        </View>
        <View
          style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Icon.OpenLink />
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: appColors.themeColor,
            fontSize: appSizes.Text.large,
            fontFamily: appFonts.bold,
            ...appStyles.textLightShadow,
            textAlign: "center",
          }}
        >
          $ 3.2K
        </Text>
      </View>
    </View>
  );
};

const AnyQuickOpenCard = () => {
  return (
    <View
      style={{
        backgroundColor: appColors.themeColorTertiary,
        flex: 1,
        borderRadius: 15,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 4 }}>
          <Text
            style={{
              color: appColors.themeColor,
              fontSize: appSizes.Text.regular,
              fontFamily: appFonts.medium,
              ...appStyles.textLightShadow,
            }}
          >
            Items
          </Text>
        </View>
        <View
          style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}
        >
          <Icon.OpenLink />
        </View>
      </View>
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon.Items color={appColors.themeColor} size={appSizes.Icon.xxLarge} />
      </View>
    </View>
  );
};

const pos = () => {
  return (
    <View style={{ flex: 1, padding: appSpacing.screenPaddingLeft }}>
      <SectionHeader
        title={"Start Transaction"}
        renderTitle={({ TitleTextComponent, fontSize, color }) => (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TitleTextComponent
              title={"Start Transaction"}
              fontSize={fontSize}
              color={color}
            />
            <ChipButton
              label={"Started"}
              labelStyle={{ fontSize: appSizes.Text.xSmall }}
              plain={true}
            />
          </View>
        )}
        containerStyle={{ paddingBottom: 12 }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <PosQuickMode icon={"PosScanMode"} label={"Scan"} />
        <PosQuickMode icon={"PosManualMode"} label={"Search"} />
        <PosQuickMode icon={"PosShortkeysMode"} label={"Shortkey"} />
      </View>
      <SectionHeader
        title={"Recent Transaction"}
        btnText={"See all"}
        containerStyle={{ paddingTop: 20, paddingBottom: 8 }}
      />
      <View
        style={{
          flex: 1,
          flexGrow: 1,
        }}
      >
        <FlatList
          contentContainerStyle={{ paddingVertical: 10 }}
          showsVerticalScrollIndicator={false}
          data={TR}
          renderItem={({ item }) => <TransactionRowCard item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Spacer size={8} horizontal={false} />}
        />
      </View>
      <SectionHeader
        title={"Quick Links"}
        btnText={"Settings"}
        containerStyle={{ paddingTop: 20, paddingBottom: 8 }}
      />
      <View
        style={
          {
            // flex: 1,
          }
        }
      >
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ width: 140, height: 120, marginEnd: 10 }}>
            <DashboardEarningsCard />
          </View>
          <View style={{ width: 140, height: 120, marginEnd: 10 }}>
            <DashboardCashOnHandCard />
          </View>

          <View style={{ width: 140, height: 120, marginEnd: 10 }}>
            <AnyQuickOpenCard />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default pos;
