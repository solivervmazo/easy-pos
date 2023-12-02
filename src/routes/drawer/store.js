const STORE_PREFIX = "store";
export const storeDrawerRoutes = {
  store: {
    path: `(${STORE_PREFIX})/index`,
    options: {
      routeOptions: {
        head: true,
        key: STORE_PREFIX,
      },
      drawerLabel: "Store",
      title: "Store",
    },
  },
  [`${STORE_PREFIX}store-pos`]: {
    path: `(${STORE_PREFIX})/pos`,
    options: {
      routeOptions: {
        key: `${STORE_PREFIX}-pos`,
        icon: "Pos",
        initialScreen: "index",
      },
      drawerLabel: "Point of sale",
      title: "Point of sale",
    },
  },
};
