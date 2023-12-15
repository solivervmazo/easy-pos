import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { appStore } from "../store";
import { appColors, appConstants } from "../../themes";

const MyAppLayout = ({ onLayoutRootView }) => {
  const dispatch = useDispatch();
  const toastQueue = useSelector(appStore.toast.selectors.toastQueue);
  const onQueue = useSelector(appStore.toast.selectors.onQueue);
  const toast = useToast();

  useEffect(() => {
    dispatch(appStore.toast.actions.getQueueAction());
    if (onQueue && Object.keys(onQueue || {}).length > 0 && toast) {
      toast.hideAll();
      const {
        message = false,
        options = {},
        offset = appConstants.TOAST_ON_DRAWER_OFFSET,
      } = onQueue;
      toast.show(message, {
        ...options,
        style: {
          marginTop: offset,
        },
      });
    }
  }, [toastQueue, toast]);

  return (
    <Stack
      onLayout={onLayoutRootView}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: appColors.themeColor,
        },
        headerTintColor: appColors.lightText,
      }}
    />
  );
};

export default MyAppLayout;
