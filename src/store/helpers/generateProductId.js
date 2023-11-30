import { selectProductsQuery } from "../../db/products";

export const generateProductId = async (db, random = false) => {
  const { query, args } = selectProductsQuery({
    orderBy: "id",
    desc: true,
    limit: 1,
  });
  let rows = [];
  await db.transactionAsync(async (tx) => {
    rows = await tx.executeSqlAsync(query, args);
  });
  const latestProjectId = rows?.rows?.[0]?.id || 0;
  return `${
    (random ? Math.floor(Math.random() * 999999) + 1000000 : 1000000) +
    latestProjectId
  }`;
};
