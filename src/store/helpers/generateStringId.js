export const generateStringId = async (latestId, random = false) => {
  return `${
    (random ? Math.floor(Math.random() * 999999) + 1000000 : 1000000) + latestId
  }`;
};
