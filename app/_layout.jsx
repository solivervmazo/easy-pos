import React, { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { store } from "../src/store/store";
import * as SQLlite from "expo-sqlite";
import { dbProductCategories, dbProducts } from "../src/features/products/";
import { ToastProvider } from "react-native-toast-notifications";
import MyAppLayout from "../src/my-app/layouts/MyAppLayout";
const db_name = "easy-pos";
SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const db = SQLlite.openDatabase(db_name);
  const [ready, setReady] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
  });

  useEffect(() => {
    db.transaction(
      (tx) => {
        dbProducts
          .dbSchema()
          .concat(dbProductCategories.dbSchema())
          .forEach((stmnt) =>
            tx.executeSql(stmnt, null, null, (_, error) => console.log(error))
          );
        new Array(10).fill({}).map((item, index) => {
          const { query, args } = dbProducts.insertQuery({
            productCategory: { id: index == 8 ? 1 : 0 },
            productId:
              (Math.floor(Math.random() * 999) + 1000).toString() +
              index.toString(),
            productName: `Item ${index} with ${[
              "sugar",
              "salt",
              "onion",
            ].splice(Math.floor(Math.random() * 3), 1)}`,
            productDescription: `Item Random Description ${index} with ${[
              "sugar",
              "salt",
              "onion",
            ].splice(Math.floor(Math.random() * 3), 1)}`,
            productPrice: (Math.random() * 99).toFixed(3),
          });
          tx.executeSql(query, args, (_, row) => {});
        });

        new Array(10).fill({}).map((item, index) => {
          const { query, args } = dbProductCategories.insertQuery({
            categoryId:
              (Math.floor(Math.random() * 999) + 1000).toString() +
              index.toString(),
            categoryName: `${["food", "drinks", "add-ons"].splice(
              Math.floor(Math.random() * 3),
              1
            )}`,
          });
          tx.executeSql(query, args, (_, row) => {});
        });
      },
      (err) => {
        console.log(err);
      },
      () => {
        setReady(true);
      }
    );
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, []);
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    (ready && (
      <Provider store={store}>
        <ToastProvider
          placement="top"
          duration={4000}
          animationType="slide-in"
          animationDuration={250}
          style={{ marginTop: 100 }}
        >
          <MyAppLayout onLayoutRootView={onLayoutRootView} />
        </ToastProvider>
      </Provider>
    )) ||
    null
  );
};

export default _layout;
