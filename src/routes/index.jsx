import routes from "./routes";

export const useDrawerRoutes = () => {
  return routes.drawer;
};

export const useStackRoutes = () => {
  return routes.stack;
};

export const replaceSlugs = (route, slugs = []) => {
  if (!route) return "/";
  const { path, slugs: routeSlugs = [] } = route;
  if (!routeSlugs) return path;
  let _path = path;
  routeSlugs.forEach((_slug, _index) => {
    _path = _path.replace(`[${_slug}]`, slugs[_index]);
  });
  return _path;
};

export { routes };
