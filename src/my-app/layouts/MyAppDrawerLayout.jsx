import React, { useState } from "react";
import { Drawer } from "expo-router/drawer";
import { AppDrawer } from "../../ui";
import { useDrawerRoutes } from "../../routes";
import { appColors, appSpacing } from "../../themes";
import { StatusBar } from "expo-status-bar";
import MyAppDrawerHeaderLeft from "../ui/MyAppDrawerHeaderLeft";
import MyAppDrawerHeaderTitle from "../ui/MyAppDrawerHeaderTitle";
import MyAppDrawerHeaderRight from "../ui/MyAppDrawerHeaderRight";
import MyAppDrawerTogglerButton from "../ui/MyAppDrawerTogglerButton";
import { HeaderMode } from "../../enums";
import { useDispatch } from "react-redux";
import { appStore } from "../store/";
const MyAppDrawerLayout = ({ onLayout }) => {
  const dispatch = useDispatch();
  const [drawerActiveIndexState, setDrawerActiveIndex] = useState(0);
  const [headerIsSearchModeState, setHeaderIsSearchMode] = useState(false);
  const routes = useDrawerRoutes();

  const [headerModeState, setHeaderMode] = useState(HeaderMode.drawer);

  const onToggleHeaderMode = () => {
    setHeaderIsSearchMode(!headerIsSearchModeState);
  };

  const onToggleDrawerModeOnNavigated = (currentDrawerIndex) => {
    setDrawerActiveIndex(currentDrawerIndex || 0);
    setHeaderIsSearchMode(
      drawerActiveIndexState != currentDrawerIndex &&
        headerIsSearchModeState == true
    );
  };

  const onTitleHiddenHandle = (hidden) => {
    const headerMode = hidden ? HeaderMode.search : HeaderMode.drawer;
    setHeaderMode(headerMode);
    // dispatch(appStore.header.actions.changeHeaderMode({ headerMode }));
    if (headerMode == HeaderMode.drawer) {
      // dispatch(
      //   appStore.header.actions.changeSearchValueAction({
      //     searchValue: "",
      //   })
      // );
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Drawer
        screenListeners={{
          state: (state) => {
            onToggleDrawerModeOnNavigated(state.data?.state.index || 0);
          },
        }}
        defaultStatus={"closed"}
        onLayout={onLayout}
        drawerContent={(props) => (
          <AppDrawer
            {...props}
            renderToggler={() => (
              <MyAppDrawerTogglerButton
                onPress={props.navigation.toggleDrawer}
                tintColor={appColors.themeColor}
                style={{
                  marginEnd: 12,
                }}
              />
            )}
          />
        )}
        screenOptions={({ navigation }) => ({
          headerTintColor: appColors.lightText,
          headerStyle: {
            backgroundColor: appColors.themeColor,
            elevation: 0,
          },
          headerTitleContainerStyle: {
            marginHorizontal: 0,
          },
          headerLeftContainerStyle: {
            width: 60,
            paddingHorizontal: appSpacing.screenPaddingLeft,
          },
          headerRightContainerStyle: {
            paddingEnd: appSpacing.screenPaddingLeft,
          },
          headerTitleContainerStyle: {
            marginHorizontal: 0,
          },
          headerLeft: () => (
            <MyAppDrawerHeaderLeft
              toggle={headerIsSearchModeState}
              onBack={
                headerModeState == HeaderMode.search
                  ? onToggleHeaderMode
                  : navigation.toggleDrawer
              }
            />
          ),
          headerTitle: ({ children }) => {
            return (
              <MyAppDrawerHeaderTitle
                titleText={children}
                toggle={headerIsSearchModeState}
                onHidden={({ hidden }) => onTitleHiddenHandle(hidden)}
              />
            );
          },
          headerRight: ({ tintColor }) => (
            <MyAppDrawerHeaderRight
              showInput={headerModeState == HeaderMode.search}
              tintColor={tintColor}
              onShowInput={onToggleHeaderMode}
            />
          ),
        })}
      >
        {Object.keys(routes).map((key) => {
          const route = routes[key];
          return (
            <Drawer.Screen
              name={route.path}
              options={{
                ...route.options,
                routeOptions: {
                  ...route.options?.routeOptions,
                  canNavigate: true,
                },
              }}
              key={key}
            />
          );
        })}
      </Drawer>
    </>
  );
};
export default MyAppDrawerLayout;
