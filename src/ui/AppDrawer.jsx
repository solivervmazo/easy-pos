import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import {
  appColors,
  appConstants,
  appFonts,
  appSizes,
  appSpacing,
} from "../themes/";
import Icon from "./core/Icon";
import Spacer from "./core/Spacer";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "./UserAvatar";
import Constants from "expo-constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ItemListHeader = ({ options }) => {
  const { drawerLabel } = options;
  return (
    <View style={styles.itemWrapper}>
      <Text style={styles.itemListHeader}>{drawerLabel}</Text>
    </View>
  );
};

const ItemListItem = ({ options, isFocused, onPress }) => {
  const { drawerLabel, itemOptions: { icon } = {} } = options;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={appConstants.ACTIVE_OPACITY}
    >
      <View
        style={[
          styles.itemWrapper,
          {
            backgroundColor: isFocused
              ? appColors.lightBgTertiary
              : appColors.lightBackgroud,
          },
        ]}
      >
        {icon ? (
          <>
            {Icon.Icons(icon, {
              size: appSizes.Icon.medium,
            })}
            <Spacer size={10} />
          </>
        ) : null}
        <Text style={styles.itemListItem}>{drawerLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DrawerFooter = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexShrink: 1,
        padding: appSpacing.screenPaddingLeft,
        backgroundColor: appColors.lightBgSecondary,
        alignItems: "center",
      }}
    >
      <UserAvatar />
      <View
        style={{
          marginStart: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: appSizes.Text.regular,
            fontFamily: appFonts.medium,
          }}
        >
          {`Hello `}
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={{
              fontSize: appSizes.Text.regular,
              fontFamily: appFonts.regular,
            }}
          >
            User
          </Text>
        </Text>
        <Text
          style={{
            fontSize: appSizes.Text.semiRegular,
            fontFamily: appFonts.regular,
          }}
        >
          Admin
        </Text>
      </View>
    </View>
  );
};

const DrawerAuxSpace = () => {
  return (
    <View
      style={{
        flexShrink: 1,
        padding: appSpacing.screenPaddingLeft,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/imgs/cloud-sync.png")}
        resizeMode={"center"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          width: 100,
        }}
      ></Image>
      <Text
        style={{
          fontSize: appSizes.Text.semiRegular,
          fontFamily: appFonts.medium,
        }}
      >
        Sync Data
      </Text>
      <Text
        style={{
          fontSize: appSizes.Text.small,
          fontFamily: appFonts.regular,
          paddingHorizontal: 20,
          textAlign: "center",
          color: appColors.darkTextTertiary,
        }}
      >
        Login to sync your data from cloud and have more control over your app.
      </Text>
      <Text
        style={{
          fontSize: appSizes.Text.semiRegular,
          fontFamily: appFonts.bold,
          paddingHorizontal: 20,
          textAlign: "center",
          color: appColors.themeColorSecondary,
        }}
      >
        Login
      </Text>
    </View>
  );
};

const DrawerHeader = () => {
  const statusBarHeight = Constants.statusBarHeight;
  return (
    <View
      style={{
        paddingHorizontal: appSpacing.screenPaddingLeft,
        paddingTop: statusBarHeight + 2,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/logo-light.png")}
        style={{
          width: 28,
          height: 28,
          aspectRatio: "1/1",
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          marginStart: 10,
          color: appColors.themeColor,
          fontSize: appSizes.Text.medium,
          fontFamily: appFonts.medium,
        }}
      >
        Easy POS
      </Text>
    </View>
  );
};

const AppDrawer = (props) => {
  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();
  const onPress = (path) => {
    navigation.navigate(path);
  };
  return (
    <View style={{ flex: 1, backgroundColor: appColors.lightBackgroud }}>
      <DrawerHeader />
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          paddingHorizontal: appSpacing.screenPaddingLeft,
        }}
      >
        <DrawerContentScrollView
          contentContainerStyle={{
            paddingTop: 5,
          }}
          {...props}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];

            return options.itemOptions?.type === "none" ? null : options
                .itemOptions?.type === "head" ? (
              <ItemListHeader options={options} key={options.itemOptions.key} />
            ) : (
              <ItemListItem
                key={route.key}
                isFocused={isFocused}
                options={options}
                onPress={() => onPress(route.name)}
              />
            );
          })}
        </DrawerContentScrollView>
      </View>
      <DrawerAuxSpace />
      {/* <DrawerFooter /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  itemListHeader: {
    color: appColors.darkTextTertiary,
    fontFamily: appFonts.bold,
    fontSize: appSizes.Text.semiRegular,
  },
  itemListItem: {
    color: appColors.darkText,
    fontFamily: appFonts.regular,
    fontSize: appSizes.Text.regular,
    fontWeight: "500",
  },
});

export default AppDrawer;
