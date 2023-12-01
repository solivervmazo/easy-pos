// **NOTE: path  must match the url from root following expo fiel base routing

const _storeDrawerRoutes = {
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

const _unitsPrefix = "units";
const _unitsDrawerRoutes = {
  tools: {
    path: `(${_unitsPrefix})/index`,
    options: {
      routeOptions: {
        head: true,
        key: "units",
      },
      drawerLabel: "Units",
      title: "Units",
    },
  },
  [`${_unitsPrefix}-products`]: {
    path: `(${_unitsPrefix})/products`,
    options: {
      routeOptions: {
        key: `${_unitsPrefix}-products`,
        icon: "Items",
        initialScreen: "index",
      },
      drawerLabel: "Products",
      title: "Products",
    },
  },
};

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
  ..._storeDrawerRoutes,
  ..._unitsDrawerRoutes,
};

const PRODUCTS_PREFIX = "products";
const PRODUCTS_PRODUCTS_PREFIX = "products";
const stack = {
  [`${PRODUCTS_PREFIX}-detail`]: {
    path: `${PRODUCTS_PREFIX}/${PRODUCTS_PRODUCTS_PREFIX}/[$id]`,
    slugs: ["$id"],
    options: {
      routeOptions: {},
    },
    modals: {
      "detail-select-category": {
        path: `${PRODUCTS_PREFIX}/${PRODUCTS_PRODUCTS_PREFIX}/select-category`,
      },
      "detail-select-shortkey-color": {
        path: `${PRODUCTS_PREFIX}/${PRODUCTS_PRODUCTS_PREFIX}/select-shortkey-color`,
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
