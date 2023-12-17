import { ActionReducerMapBuilder, AnyAction } from "@reduxjs/toolkit";
import {
  AsyncThunkFulfilledActionCreator,
  AsyncThunkPendingActionCreator,
  AsyncThunkRejectedActionCreator,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { FormState, HeaderMode, RequestState, SpinnerState } from "../../enums";
import { WritableDraft } from "immer/dist/internal";
import { ToastOptions } from "react-native-toast-notifications";
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
  createBuilder: (
    builder: ActionReducerMapBuilder<T>,
    action: any,
    fullfilled: <T>(
      state: CreatorState,
      action: { payload: T; [key: string]: any }
    ) => CreatorState | undefined,
    actionState?: {
      pending?: AsyncThunkPendingActionCreator<any, {}>;
      rejected?: AsyncThunkRejectedActionCreator<any, {}>;
    }
  ) => ActionReducerMapBuilder<T>;
}

export type StateFormProps<T> = {
  state: FormState;
  body: T;
};

export abstract class StateCreatorsBuilder
  implements IStateCreatorsBuilder<CreatorState>
{
  constructor() {}
  createBuilder<T>(
    builder: ActionReducerMapBuilder<CreatorState>,
    action: any,
    fulfilled: (
      state: CreatorState,
      action: { payload: T }
    ) => CreatorState | undefined,
    actionState?: {
      pending?: any;
      rejected?: any;
    }
  ) {
    const { pending, rejected } = {
      pending: actionState?.pending,
      rejected: actionState?.pending,
    };
    return builder
      .addCase(
        action.pending,
        (state: WritableDraft<CreatorState>, action: any) => {
          if (pending && typeof pending == "function") {
            const newState = pending(state, action);
            if (typeof newState === "object") return newState;
          }
        }
      )
      .addCase(
        action.fulfilled,
        (state: WritableDraft<CreatorState>, action: any) => {
          if (fulfilled && typeof fulfilled == "function") {
            const newState = fulfilled(state, action);
            if (typeof newState === "object") return newState;
          }
        }
      )
      .addCase(
        action.rejected,
        (state: WritableDraft<CreatorState>, action: any) => {
          console.error(action.error.message);
          if (rejected && typeof rejected == "function") {
            const newState = rejected(state, action);
            if (typeof newState === "object") return newState;
          }
        }
      );
  }
}
