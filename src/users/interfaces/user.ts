export interface IUser {
  name: string;
  id: string;
  email: string;
  isVerification: boolean;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
}
