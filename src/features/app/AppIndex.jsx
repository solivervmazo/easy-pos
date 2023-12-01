import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRoutes } from "../../routes/routes";
import { Link, Stack } from "expo-router";

const Links = ({ route }) => {
  return (
    <>
      <Link href={route.route.path} asChild>
        <Text style={{ padding: 20, fontSize: 20 }}>{route.route.path}</Text>
      </Link>
      {Object.keys(route.children || {}).map((key, _) => (
        <Links route={route.children[key]()} key={key} />
      ))}
    </>
  );
};

const AppIndex = () => {
  const routes = useRoutes();
  return (
    <View>
      <Stack.Screen />
      {Object.keys(routes).map((key, _) => (
        <Links route={routes[key]()} key={key} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});
export default AppIndex;
