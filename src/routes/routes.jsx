// **NOTE: path  must match the url from root following expo fiel base routing

const drawer = {
  home: {
    path: "(home)/home",
    options: {
      routeOptions: {
        key: "home",
        icon: "Home",
      },
      drawerLabel: "Home",
      title: "Home",
    },
  },
  store: {
    path: "(store)/index",
    options: {
      routeOptions: {
        head: true,
        key: "store",
        initialScreen: "(store)/items",
      },
      drawerLabel: "Store",
      title: "Store",
    },
  },
  "store-items": {
    path: "(store)/items",
    options: {
      routeOptions: {
        key: "store-items",
        icon: "Items",
        initialScreen: "index",
      },
      drawerLabel: "Items",
      title: "Items",
    },
  },
  "store-pos": {
    path: "(store)/pos",
    options: {
      routeOptions: {
        key: "store-pos",
        icon: "Pos",
      },
      drawerLabel: "Point of sale",
      title: "Point of sale",
    },
  },
};

const stack = {};

export default routes = {
  drawer,
  stack,
};
