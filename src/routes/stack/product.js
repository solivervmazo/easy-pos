const PRODUCTS_PREFIX = "products";
const PRODUCTS_PRODUCTS_PREFIX = "products";
const PRODUCTS_CATEGORIES_PREFIX = "categories";
const PRODUCTS_FACTORIES_PREFIX = "product-factories";
export const productsStackRoutes = {
  [`${PRODUCTS_PRODUCTS_PREFIX}-detail`]: {
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
  [`${PRODUCTS_CATEGORIES_PREFIX}-detail`]: {
    path: `${PRODUCTS_PREFIX}/${PRODUCTS_CATEGORIES_PREFIX}/[$id]`,
    slugs: ["$id"],
    options: {
      routeOptions: {},
    },
    modals: {
      "detail-select-category": {
        path: `${PRODUCTS_PREFIX}/${PRODUCTS_CATEGORIES_PREFIX}/select-parent-category`,
      },
      "detail-select-shortkey-color": {
        path: `${PRODUCTS_PREFIX}/${PRODUCTS_CATEGORIES_PREFIX}/select-shortkey-color`,
      },
    },
  },
  [`${PRODUCTS_FACTORIES_PREFIX}-detail`]: {
    path: `${PRODUCTS_PREFIX}/${PRODUCTS_FACTORIES_PREFIX}/[$id]`,
    slugs: ["$id"],
    options: {
      routeOptions: {},
    },
  },
};
