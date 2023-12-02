const UNITS_PREFIX = "units";
export const unitsDrawerRoutes = {
  units: {
    path: `(${UNITS_PREFIX})/index`,
    options: {
      routeOptions: {
        head: true,
        key: "units",
      },
      drawerLabel: "Units",
      title: "Units",
    },
  },
  [`${UNITS_PREFIX}-products`]: {
    path: `(${UNITS_PREFIX})/products`,
    options: {
      routeOptions: {
        key: `${UNITS_PREFIX}-products`,
        icon: "Items",
        initialScreen: "index",
      },
      drawerLabel: "Products",
      title: "Products",
    },
  },
};
