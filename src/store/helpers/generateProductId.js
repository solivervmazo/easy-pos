import { selectProductsQuery } from "../../db/products";
import { generateStringId } from "./generateStringId";
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
  return generateStringId(latestProjectId, random);
};
