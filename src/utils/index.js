export const generateStringId = (latestId, random = false) => {
  return `${
    (random ? Math.floor(Math.random() * 999999) + 1000000 : 1000000) + latestId
  }`;
};

export const compareByKey = (val, key, items) => {
  const _found = items.find((obj) => (obj?.[key] || obj) == val[key]);

  return _found === undefined || _found === null || _found < 0 ? false : true;
};
export const compareByValue = (val, items) => {
  return items.find((obj) => obj == val) || false;
};
