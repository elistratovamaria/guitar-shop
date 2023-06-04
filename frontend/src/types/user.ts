import { Token } from './token';

export type User = {
  email: string;
  userName: string;
  token?: Token;
  isAdmin?: boolean;
};
