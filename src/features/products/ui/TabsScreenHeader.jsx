import React from "react";
import { Stack } from "expo-router";
import { t } from "../../../locale/localization";

const TabsScreenHeader = ({ title, renderTitle }) => {
  const titleComposer = (screenTitle, parenthesized, isNew = true) => {
    return title
      ? title
      : `${isNew ? t("New") + " " : ""}${screenTitle}${
          !isNew && parenthesized ? `(${parenthesized})` : ""
        }`;
  };

  return (
    <Stack.Screen
      options={{
        ...(renderTitle ? { title: renderTitle(titleComposer) } : {}),
        headerShown: true,
      }}
    />
  );
};

export default TabsScreenHeader;
