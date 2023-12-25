import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { RequestState } from "../../../context-manager";
import { FormState, SpinnerState } from "../../../enums";
import {
  CreatorState,
  IStateCreators,
  StateCreatorsBuilder,
  StateFormProps,
} from "../../../my-app";
import { CashRegisterSqlRawProps, PosRegisterScreenState } from "../types";
import { checkDeviceAndGetRegister } from "./actions/register";

type ScreenState = PosRegisterScreenState;

class PosRegisterCreators
  extends StateCreatorsBuilder<ScreenState>
  implements IStateCreators<ScreenState>
{
  constructor() {
    super();
  }

  state = {
    screenRegisterSpinner: SpinnerState.show,
    registerSession: undefined,
  };

  actions = {
    // restartForm: (state: ScreenState) => {
    //   return {
    //     ...state,
    //     productForm: undefined,
    //   };
    // },
  };

  creators = {
    checkDeviceAndGetRegister,
  };

  builder = (
    builder: ActionReducerMapBuilder<CreatorState & PosRegisterScreenState>
  ) => {
    this.createBuilder<CashRegisterSqlRawProps[]>(
      builder,
      checkDeviceAndGetRegister,
      (state, { payload }) => {
        return <PosRegisterScreenState>{
          ...state,

          screenRegisterSpinner: SpinnerState.hidden,
        };
      },
      {
        pending: (state) => {
          state.screenRegisterSpinner = SpinnerState.show;
        },
        rejected: (state) => {
          state.screenRegisterSpinner = SpinnerState.hidden;
        },
      }
    );
  };
}

export const posRegisterCreators = new PosRegisterCreators();
