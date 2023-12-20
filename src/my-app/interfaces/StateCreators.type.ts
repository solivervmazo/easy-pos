import { ActionReducerMapBuilder, AnyAction } from "@reduxjs/toolkit";
import {
  AsyncThunkFulfilledActionCreator,
  AsyncThunkPayloadCreator,
  AsyncThunkPendingActionCreator,
  AsyncThunkRejectedActionCreator,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { FormState, HeaderMode, RequestState, SpinnerState } from "../../enums";
import { WritableDraft } from "immer/dist/internal";
import { ToastOptions } from "react-native-toast-notifications";
import { DbRequestArgs, ReduxActionRequestArgs } from "../../types";
export type CreatorState = HeaderCreatorState | any;

export type HeaderCreatorState = {
  headerMode: HeaderMode;
  headerCurrentFeature: string;
  headerCurrentSubFeature: string;
  searchValue: string;
  searchInputPlaceholder: string;
};

export type ToastQueueItem = {
  message: string;
  options?: ToastOptions;
};

export type ToastCreatorState = {
  toastQueue?: Array<{} & ToastQueueItem>;
  onQueue?: {} & ToastQueueItem;
};

export interface IStateCreators<T> {
  state: T;
  actions: { [key: string]: any };
  creators: { [key: string]: any };
  builder: (builder: ActionReducerMapBuilder<T>) => void;
}

export interface IStateCreatorsBuilder<T> {
  createBuilder: <U = never, V = never>(
    builder: ActionReducerMapBuilder<T>,
    action: any,
    fullfilled: (
      state: T,
      action: { payload: U; [key: string]: any }
    ) => T | void,
    actionState?: {
      pending?: (state: T) => T | void;
      rejected?: (state: T) => T | void;
    }
  ) => ActionReducerMapBuilder<T>;
}

export type StateFormProps<T> = {
  state: FormState;
  body: T;
};

export abstract class StateCreatorsBuilder<T>
  implements IStateCreatorsBuilder<T>
{
  constructor() {}
  createBuilder<U = never, V = never>(
    builder: ActionReducerMapBuilder<T>,
    action: any,
    fulfilled: (state: T, action: { payload: U }) => T | void,
    actionState?: {
      pending?: (state: T, action: { payload: U }) => T | void;
      rejected?: (state: T, action: { payload: U }) => T | void;
    }
  ) {
    const { pending, rejected } = {
      pending: actionState?.pending,
      rejected: actionState?.pending,
    };
    return builder
      .addCase(action.pending, (state: WritableDraft<any>, action: any) => {
        if (pending && typeof pending == "function") {
          const newState = pending(state, action);
          if (typeof newState === "object") return newState;
        }
      })
      .addCase(action.fulfilled, (state: WritableDraft<any>, action: any) => {
        if (fulfilled && typeof fulfilled == "function") {
          const newState = fulfilled(state, action);
          if (typeof newState === "object") return newState;
        }
      })
      .addCase(action.rejected, (state: WritableDraft<any>, action: any) => {
        console.error(action.error.message);
        if (rejected && typeof rejected == "function") {
          const newState = rejected(state, action);
          if (typeof newState === "object") return newState;
        }
      });
  }
}
