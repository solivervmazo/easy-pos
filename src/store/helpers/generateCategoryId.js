import { selectCategoriesQuery } from "../../db/categories";
import { generateStringId } from "./generateStringId";
export const generateCategoryId = async (db, random = false) => {
  const { query, args } = selectCategoriesQuery({
    orderBy: "id",
    desc: true,
    limit: 1,
  });
  let rows = [];
  await db.transactionAsync(async (tx) => {
    rows = await tx.executeSqlAsync(query, args);
  });
  const latestCategoryId = rows?.rows?.[0]?.id || 0;
  return generateStringId(latestCategoryId, random);
};
