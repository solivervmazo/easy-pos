import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  StateCreatorsBuilder,
  IStateCreators,
  ToastCreatorState,
} from "../../interfaces/StateCreators.type";

class ToastCreators
  extends StateCreatorsBuilder
  implements IStateCreators<ToastCreatorState>
{
  constructor() {
    super();
  }
  state = {
    toastQueue: [],
    onQueue: undefined,
  };
  actions = {
    addQueueAction: (state: ToastCreatorState, { payload }) => {
      return {
        ...state,
        // toastQueue: state.toastQueue.push(payload?.payload),
      };
    },
    getQueueAction: (state: ToastCreatorState, { payload }) => {
      return {
        ...state,
        onQueue: state.toastQueue.pop(),
        toastQueue: state.toastQueue,
      };
    },
  };
  creators: {};
  builder = (builder: ActionReducerMapBuilder<ToastCreatorState>) => {};
}

export const toastCreators = new ToastCreators();
