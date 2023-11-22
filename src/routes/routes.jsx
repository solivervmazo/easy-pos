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
        initialScreen: "index",
      },
      drawerLabel: "Point of sale",
      title: "Point of sale",
    },
  },
};

const stack = {
  "items-detail": {
    path: "items/[$id]",
    slugs: ["$id"],
    options: {
      routeOptions: {
        key: "store-pos-manual",
        icon: "Pos",
      },
      drawerLabel: "Point of sale",
      title: "Point of sale",
    },
    modals: {
      "detail-select-category": {
        path: "items/select-category",
      },
      "detail-select-shortkey-color": {
        path: "items/select-shortkey-color",
      },
    },
  },

  "store-pos-manual": {
    path: "pos/manual-mode",
    options: {
      routeOptions: {
        key: "store-pos-manual",
        icon: "Pos",
      },
      drawerLabel: "Point of sale",
      title: "Point of sale",
    },
  },
};

export default routes = {
  drawer,
  stack,
};
