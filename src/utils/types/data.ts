export type User = {
  auth: boolean;
  username: String;
  phonenumber: number;
  isAdmin: boolean;
  credit: number;
};
export type Transaction = {
  _id: string;
  timestamp: Date;
  username: string;
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
  first: number;
  second: number;
  third: number;
  bet: number;
  winners: string[];
  timestamp: Date;
};
