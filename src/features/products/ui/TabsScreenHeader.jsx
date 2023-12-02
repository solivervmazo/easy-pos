import React from "react";
import { Stack } from "expo-router";

const TabsScreenHeader = ({ title, renderTitle }) => {
  const titleComposer = (screenTitle, parenthesized, isNew = true) => {
    return title
      ? title
      : `${isNew ? "New " : ""}${screenTitle}${
          parenthesized ? `(${parenthesized})` : ""
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
