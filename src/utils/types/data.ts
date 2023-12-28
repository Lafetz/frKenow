export type User = {
  auth: boolean;
  username: string;
  number: number;
  isAdmin: boolean;
  credit: number;
};
export type Transaction = {
  _id: string;
  name: string;
  timestamp: Date;
  username: string;
  fname: string;
  lname: string;
  account: string;
  amount: number;
  status: string;
};
export enum TransType {
  pending,
  approved,
  All,
}
export type Report = {
  _id: string;
  gameno: number;
  first: number;
  second: number;
  third: number;
  bet: number;
  balls: number[];
  winners: string[];
  timestamp: Date;
};
export type Bank = {
  id: string;
  name: string;
};
export type Field = {
  fname: string;
  lname: string;
  confirm: string;
  number: string;
  username: string;
  password: string;
};
