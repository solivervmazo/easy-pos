export const compareByKey = (val, key, items) => {
  const foundIndex = items.find((obj) => (obj?.[key] || obj) == val[key]);

  return foundIndex === undefined || foundIndex === null || foundIndex < 0
    ? false
    : true;
};

export const compareByValue = (val, items) => {
  return items.find((obj) => obj == val) || false;
};

export const _$init = (values, items, itemKey) => {
  const preselected = (Array.isArray(values) ? values : [values]) || [];
  // TODO: Clean logic for multiple and single selection
  const postselected =
    items.map((item, index) => ({
      ...item,
      _$key: index,
      _$selected: itemKey
        ? compareByKey(item, itemKey, preselected)
        : compareByValue(item, preselected),
      _$visible: true,
    })) || [];
  return postselected;
};

export const _$selection = (haystack, needle, multiple = false) => {
  const foundIndex = haystack.findIndex((_item) => _item._$key === needle);
  if (foundIndex > -1) {
    haystack.map((_res, _index) =>
      _index == foundIndex
        ? (_res._$selected = !_res._$selected)
        : (_res._$selected = multiple
            ? needle < 0
              ? false
              : _res._$selected
            : false)
    );
    return Object.assign([], haystack);
  }
};

export const _$filter = (haystack, truthy = true) => {
  return Object.assign(
    [],
    haystack.filter((hay) => hay._$selected === truthy)
  );
};

export const _$recentFilterStrategy = (haystack, needle = "", limit = 0) => {
  return haystack
    .filter((item) => item.includes(needle))
    .filter((_, index) => index < limit);
};

export const _$deleteReservedKeys = (obj) => {
  const _deleteKeys = (o) => {
    const oCloned = { ...o };
    Object.keys(oCloned).forEach((key) => {
      if (key.startsWith("_$")) delete oCloned[key];
    });
    return oCloned;
  };

  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      let cloneObj = [].concat(obj);
      cloneObj.forEach((o, i) => (cloneObj[i] = _deleteKeys(o)));
      return cloneObj;
    } else {
      const cloneObj = Object.assign({}, obj);
      _deleteKeys(cloneObj);
      return cloneObj;
    }
  }
  return obj;
};

export const _$searchStrategy = (
  haystack,
  needle,
  searchKey = "label",
  strategy = undefined
) => {
  let results = null;
  if (strategy === undefined) {
    results = Object.assign([], haystack).map((hay) => ({
      ...hay,
      _$visible: (searchKey
        ? hay?.[searchKey]?.toLowerCase() || hay
        : hay.toLowerCase()
      ).includes(needle.toLowerCase()),
    }));
  }
  //   results = returnValue
  //     ? results.map((_result) => _result?.[returnValue] || results)
  //     : results;
  return results;
};
