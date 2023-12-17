export type DbRequestArgs = {
  orderBy?: string;
  desc?: boolean;
  limit?: number;
};

export type ReduxActionRequestArgs<U, T = DbRequestArgs | any> = {
  args?: U;
} & T;

export type DbInsertResponse = {
  insertId: number;
};
