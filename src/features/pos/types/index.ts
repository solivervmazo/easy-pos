import { SpinnerState } from "../../../enums";
import { CashRegisterState } from "../enums/CashRegisterState";

export type CashRegisterSqlRawProps = {
  id: number;
  cash_register_id: string;
  cash_register_session_id: number;
  cash_register_state: CashRegisterState;
  cash_register_current_user: number;
  cash_register_current_device: string;
};

export type CashRegisterTransformedProps = {
  id: number;
  cashRegisterId: string;
  cashRegisterSessionId: number;
  cashRegisterState: CashRegisterState;
  cashRegisterCurrentUser: number;
  cashRegisterCurrentDevice: string;
};

export type CashRegisterSessionSqlRawProps = {
  id: number;
  crs_id: string;
  crs_opening_dtime: Date;
  crs_started_dtime: Date;
  crs_closing_dtime: Date;
  crs_ended_dtime: Date;
  crs_starting_balance: number;
  crs_ending_balance: number;
  crs_starting_bill_count_id: number;
  crs_ending_bill_count_id: number;
  crs_current_sales_amount: number;
  crs_opening_remarks: string;
  crs_closing_remarks: string;
};

export type CashRegisterSessionTransformedProps = {
  id: number;
  crsId: string;
  crsOpeningDtime: Date;
  crsStartedDtime: Date;
  crsClosingDtime: Date;
  crsEndedDtime: Date;
  crsStartingBalance: number;
  crsEndingBalance: number;
  crsStartingBillCountId: number;
  crsEndingBillCountId: number;
  crsCurrentSalesAmount: number;
  crsOpeningRemarks: string;
  crsClosingRemarks: string;
};

export type CashRegisterSessionUserLogsSqlRawProps = {
  id: number;
  crs_id: number;
  crs_user_id: Date;
  crs_user_login_dtime: Date;
  crs_user_logout_dtime: Date;
};

export type PosRegisterScreenState = {
  screenRegisterSpinner: SpinnerState;
  registerSession: any;
};
