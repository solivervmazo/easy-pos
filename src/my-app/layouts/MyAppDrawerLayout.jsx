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
import { headerChangeSearchValueAction } from "../../store/slices/header/headerSlice";
const MyAppDrawerLayout = ({ onLayout }) => {
  const dispatch = useDispatch();
  const [_drawerActiveIndex, setDrawerActiveIndex] = useState(0);
  const [_headerIsSearchMode, setHeaderIsSearchMode] = useState(false);
  const routes = useDrawerRoutes();

  const [_headerMode, setHeaderMode] = useState(HeaderMode.drawer);

  const _toggleHeaderMode = () => {
    setHeaderIsSearchMode(!_headerIsSearchMode);
  };

  const _toggleDrawerModeOnNavigated = (currentDrawerIndex) => {
    setDrawerActiveIndex(currentDrawerIndex || 0);
    setHeaderIsSearchMode(
      _drawerActiveIndex != currentDrawerIndex && _headerIsSearchMode == true
    );
  };

  const _titleOnHiddenHandle = (hidden) => {
    const headerMode = hidden ? HeaderMode.search : HeaderMode.drawer;
    setHeaderMode(headerMode);
    if (headerMode == HeaderMode.drawer) {
      dispatch(headerChangeSearchValueAction({ searchValue: "" }));
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <Drawer
        screenListeners={{
          state: (state) => {
            _toggleDrawerModeOnNavigated(state.data?.state.index || 0);
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
              toggle={_headerIsSearchMode}
              onBack={
                _headerMode == HeaderMode.search
                  ? _toggleHeaderMode
                  : navigation.toggleDrawer
              }
            />
          ),
          headerTitle: ({ children }) => {
            return (
              <MyAppDrawerHeaderTitle
                titleText={children}
                toggle={_headerIsSearchMode}
                onHidden={({ hidden }) => _titleOnHiddenHandle(hidden)}
              />
            );
          },
          headerRight: ({ tintColor }) => (
            <MyAppDrawerHeaderRight
              showInput={_headerMode == HeaderMode.search}
              tintColor={tintColor}
              onPress={_toggleHeaderMode}
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
