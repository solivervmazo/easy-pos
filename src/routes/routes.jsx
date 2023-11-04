// **NOTE: path  must match the url from root following expo fiel base routing
export default routes = [
  {
    name: "index",
    root: "/",
    path: "",
    types: [],
    options: {},
  },
  {
    name: "login",
    root: "(auth)",
    path: "/login",
    types: ["drawer"],
    options: {
      itemOptions: {
        type: "none",
        key: "items",
      },
      drawerLabel: "Login",
      title: "Login",
    },
  },
  {
    name: "home",
    root: "(home)",
    path: "/home",
    types: ["drawer"],
    options: {
      itemOptions: {
        key: "items",
        icon: "Home",
      },
      drawerLabel: "Home",
      title: "Home",
    },
  },
  {
    name: "pos",
    root: "(home)",
    path: "/pos",
    types: ["drawer"],
    options: {
      itemOptions: {
        key: "pos",
        icon: "Qr",
      },
      drawerLabel: "Point of Sales",
      title: "Pos",
    },
  },
  {
    name: "items",
    root: "(items)",
    path: "/index",
    types: ["drawer"],
    options: {
      itemOptions: {
        type: "head",
        key: "items",
      },
      drawerLabel: "Store",
      title: "Store",
    },
    children: [
      {
        name: "itemsItems",
        path: "/items",
        types: ["drawer"],
        options: {
          itemOptions: {
            type: "sub",
            key: "items-items",
            icon: "Items",
          },
          drawerLabel: "Items",
          title: "Items",
        },
      },
      {
        name: "itemsCategories",
        path: "/categories",
        types: ["drawer"],
        options: {
          itemOptions: {
            type: "sub",
            key: "items-category",
            icon: "Tags",
          },
          drawerLabel: "Categories",
          title: "Categories",
        },
      },
      {
        name: "itemsShortkeys",
        path: "/shortkeys",
        types: ["drawer"],
        options: {
          itemOptions: {
            type: "sub",
            key: "items-shortkeys",
            icon: "Shortkeys",
          },
          drawerLabel: "Shortkeys",
          title: "Shortkeys",
        },
      },
    ],
  },
  {
    name: "transactions",
    root: "(transactions)",
    path: "/index",
    types: ["drawer"],
    options: {
      itemOptions: {
        type: "head",
        key: "transactions",
      },
      drawerLabel: "Transactions",
      title: "Transactions",
    },
    children: [
      {
        name: "transactionsSales",
        path: "/sales",
        types: ["drawer"],
        options: {
          itemOptions: {
            type: "sub",
            key: "transactions-sales",
            icon: "Receipt",
          },
          drawerLabel: "Sales",
          title: "Sales",
        },
      },
      {
        name: "transactionsReturns",
        path: "/returns",
        types: ["drawer"],
        options: {
          itemOptions: {
            type: "sub",
            key: "transactions-returns",
            icon: "ReceiptReturns",
          },
          drawerLabel: "Returns",
          title: "Returns",
        },
      },
    ],
  },
  {
    name: "tools",
    root: "(tools)",
    path: "/index",
    types: ["drawer"],
    options: {
      itemOptions: {
        type: "head",
        key: "tools",
      },
      drawerLabel: "Tools",
      title: "Tools",
    },
    children: [
      {
        name: "toolsUnits",
        path: "/units",
        types: ["drawer"],
        options: {
          itemOptions: {
            type: "sub",
            key: "tools-units",
            icon: "Unit",
          },
          drawerLabel: "Units",
          title: "Units",
        },
      },
    ],
  },
];
