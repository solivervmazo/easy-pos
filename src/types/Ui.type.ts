import { FormState } from "../enums";

export type AppForm<T> = {
  state: FormState;
  body: T;
};
