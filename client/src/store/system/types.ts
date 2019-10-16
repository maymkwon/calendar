export enum SystemActionType {
  SHOW_TOAST = "@@system/SHOW_TOAST",
  HIDE_TOAST = "@@system/HIDE_TOAST",
  PUSH_TOAST_TO_QUE = "@@system/PUSH_TOAST_TO_QUE",
  SHIFT_TOAST_FROM_QUE = "@@system/SHIFT_TOAST_FROM_QUE"
}

export interface ToastType {
  title: string;
  content: string;
}

export interface SystemState {
  readonly queue: ToastType[];
}
