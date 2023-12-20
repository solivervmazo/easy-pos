export type DbRequestArgs = {
  orderBy?: string;
  desc?: boolean;
  limit?: number;
};

export type ReduxActionRequestArgs<U, T = DbRequestArgs> = {
  args?: U;
} & T;

export type DbInsertResponse = {
  insertId: number;
};

export type DbMakeOptionalProps<T, K extends keyof T = never> = Partial<T> &
  Pick<T, K>;
