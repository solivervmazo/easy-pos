import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { getQueueAction } from "../../../store/slices/toast/toastSlice";
import { appColors, appConstants } from "../../../themes";

const AppLayout = ({ onLayoutRootView }) => {
  const dispatch = useDispatch();
  const { toastQueue, onQueue } = useSelector((state) => state.toast);
  const toast = useToast();

  useEffect(() => {
    dispatch(getQueueAction());
    if (onQueue && Object.keys(onQueue || {}).length > 0 && toast) {
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

export default AppLayout;
