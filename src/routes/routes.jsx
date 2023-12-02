import { unitsDrawerRoutes } from "./drawer/units";
import { storeDrawerRoutes } from "./drawer/store";
import { productsStackRoutes } from "./stack/product";
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
  ...storeDrawerRoutes,
  ...unitsDrawerRoutes,
};

const stack = {
  ...productsStackRoutes,

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
