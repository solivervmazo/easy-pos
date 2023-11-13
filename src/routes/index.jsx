import React from "react";
import { useRouter } from "expo-router";
import routes from "./routes";
// **NOTE: path  must match the url from root following expo fiel base routing
class _Routes {
  constructor({ router, path = "/", params = {}, children = {} }) {
    this.router = router;
    this.path = path;
    this.params = params;
    Object.keys(children).map((key) => {
      const route = new _Routes({
        path: this.path + children[key].path,
        router,
      });
      children[key] = {
        route,
        push: route.push,
        replace: route.replace,
      };
    });
    this.children = children;
  }

  push = () => {
    this.router.push({
      pathname: this.path,
      params: this.params,
    });
  };
  replace = () => {
    this.router.replace({
      pathname: this.path,
      params: this.params,
    });
  };
}

export const useRoutes = () => {
  const router = useRouter();
  return {
    index: (params) => {
      const route = new _Routes({ params, router });
      return {
        route,
        push: route.push,
        replace: route.replace,
        children: {},
      };
    },
    auth: (params) => {
      const path = "/(auth)";
      const children = {
        login: {
          path: "/login",
        },
      };
      const route = new _Routes({ path, params, router, children });
      return {
        route,
        push: route.push,
        replace: route.replace,
        children: {
          login: () => route.children["login"],
        },
      };
    },
    home: (params) => {
      const path = "/home";
      const route = new _Routes({ path, params, router });
      return {
        route,
        push: route.push,
        replace: route.replace,
        children: {},
      };
    },
    items: (params) => {
      const path = "/items";
      const children = {
        items: {
          path: "/items",
        },
        category: {
          path: "/category",
        },
        shortKeys: {
          path: "/short-keys",
        },
      };
      const route = new _Routes({ path, params, router, children });
      return {
        route,
        push: route.push,
        replace: route.replace,
        children: {
          items: () => route.children["items"],
          category: () => route.children["category"],
          shortKeys: () => route.children["shortKeys"],
        },
      };
    },
    pos: (params) => {
      const path = "/pos";
      const route = new _Routes({ path, params, router });
      return {
        route,
        push: route.push,
        replace: route.replace,
        children: {},
      };
    },
  };
};

export const useDrawerRoutes = () => {
  return routes.drawer;
  let _routes = [];
  const pushRoute = (root = false, route) => {
    if (route?.types?.includes("drawer")) {
      _routes.push({
        ...route,
        path: (root || "") + route.path,
      });
    }
  };
  routes.forEach((route) => {
    pushRoute(route.root, route);
    if (route.children) {
      route.children.forEach((child) => {
        pushRoute(route.root, child);
      });
    }
  });
  return _routes;
};

export { routes };
