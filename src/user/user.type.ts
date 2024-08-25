export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  token: string;
  created_on: Date;
  role: string;
  updated_on: Date;
  is_verification: boolean;
}

export type IUserReturn = Omit<IUser, 'password' | 'token'>;
