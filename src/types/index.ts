import { DbInsertResponse } from "./Db.type";

export type * from "./Db.type";
export type * from "./Ui.type";

export function isDbRequestInsert(response: any): response is DbInsertResponse {
  return (
    typeof response === "object" &&
    response !== null &&
    "insertId" in response &&
    response["insertId"]
  );
}
