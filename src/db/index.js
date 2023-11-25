import * as SQLlite from "expo-sqlite";
import products from "./products";
const db_name = "easy-pos.db";

export default migrate = async () => {
  const db = SQLlite.openDatabase(db_name);
  return await products(db);
};
