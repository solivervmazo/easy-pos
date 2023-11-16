import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack, useRouter } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import { appColors, appSizes, appSpacing } from "../themes";
import { ChipButton, IconButton, SectionHeader } from "../ui";
import routes from "../routes/routes";

const ScreenHeader = () => {
  const { drawer: drawerRoutes } = routes;
  const router = useRouter();
  const handleBack = () => {
    (router.canGoBack() && router.back()) ||
      router.replace(drawerRoutes["store-pos"]);
  };
  return (
    <Stack.Screen
      options={{
        headerTitle: "POS(New Transaction)",
        headerShown: true,
        headerLeft: () => (
          <IconButton
            icon={"Back"}
            size={appSizes.Icon.large}
            containerStyle={{
              backgroundColor: appColors.lightBgSecondary,
              padding: 3,
              marginEnd: 5,
              flexShrink: 1,
            }}
            onPress={handleBack}
          />
        ),
        headerRight: () => (
          <ChipButton
            label={"Save"}
            labelStyle={{
              fontSize: appSizes.Text.regular,
            }}
            buttonLeft={() => (
              <IconButton
                disabled={true}
                icon={"Save"}
                size={appSizes.Icon.regular}
                containerStyle={{
                  backgroundColor: appColors.lightBackground,
                  padding: 3,
                  flexShrink: 1,
                }}
              />
            )}
          />
        ),
      }}
    />
  );
};

const PosScreen = () => {
  const bsHeaderHeight = 80;
  const bsFooterHeight = 30;
  const bottomSheetRef = useRef();
  const [bsHeaderFlex, setBsHeaderFlex] = useState(1);
  const snapPoints = useMemo(
    () => [bsHeaderHeight + bsFooterHeight + 25, "100%"],
    []
  );
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
    setBsHeaderFlex(index == 0 ? 0 : 1);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.lightBgSecondary,
        paddingBottom: bsHeaderHeight + bsFooterHeight + 25,
      }}
    >
      <ScreenHeader />
      <Slot />
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={{ flexGrow: bsHeaderFlex }}>
          <View
            style={{
              flexDirection: "row",
              height: bsHeaderHeight,
              paddingHorizontal: appSpacing.screenPaddingLeft,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 1 }}>
                <SectionHeader title={"Current Item"} />
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: appSizes.Text.medium,
                    }}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    ITM-KL-DOOM2
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <SectionHeader title={`Price: 1,200,50`} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <IconButton
                    icon={"Minus"}
                    size={appSizes.Icon.large}
                    containerStyle={{
                      backgroundColor: appColors.lightBgTertiary,
                      padding: 8,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: appSizes.Text.medium,
                    }}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    2
                  </Text>
                  <IconButton
                    icon={"Add"}
                    size={appSizes.Icon.large}
                    containerStyle={{
                      backgroundColor: appColors.lightBgTertiary,
                      padding: 8,
                    }}
                  />
                </View>

                <IconButton
                  icon={"Calculator"}
                  size={appSizes.Icon.large}
                  containerStyle={{
                    backgroundColor: appColors.lightBgTertiary,
                    padding: 8,
                    flexShrink: 1,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flexShrink: 1,
            flexDirection: "row",
            height: bsFooterHeight,
            paddingHorizontal: appSpacing.screenPaddingLeft,
          }}
        >
          <View style={{ flex: 1 }}>
            <SectionHeader title={`Items: ${1}`} />
          </View>
          <View style={{ flex: 1 }}>
            <SectionHeader
              containerStyle={{ flexDirection: "reverse-row" }}
              title={`Total: ${"1,200.75"}`}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({});
export default PosScreen;
