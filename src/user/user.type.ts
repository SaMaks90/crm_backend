export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  token: string;
  createdOn: Date;
  role: string;
  updatedOn: Date;
  is_verification: boolean;
}

export type IUserReturn = Omit<IUser, 'password' | 'token'>;
