interface IDataDays {
  Date: string;
  End: string;
  Start: string;
}
export interface ITime {
  numberDay: number;
  time: number;
}
export interface IUserData {
  id: string;
  Fullname: string;
  Days: IDataDays[];
  data?: ITime[];
  totalTimeInMonth?: number;
}
export interface IData {
  data: IUserData[];
}
export interface IArrayDay {
  day: number;
  sort: string;
}
export interface IArrayDays {
  arrayDays: IArrayDay[];
}
