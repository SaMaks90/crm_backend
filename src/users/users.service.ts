import { Injectable } from '@nestjs/common';
import { IUser, IUpdateUser } from './interfaces/user';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      email: 'samchenkoms@gmail.com',
      id: '1111',
      name: 'Maksym',
      isVerification: false,
    },
  ];

  private getUser(email: string): IUser | null {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        return this.users[i];
      }
    }

    return null;
  }

  findUserByEmail(email: string): IUser | null {
    return this.getUser(email);
  }

  createUser(user: IUser) {
    this.users.push(user);
  }

  updateUser(email: string, user: IUpdateUser): IUser {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        this.users[i] = { ...this.users[i], ...user };
        return this.users[i];
      }
    }
  }

  deleteUser(email: string): void {
    this.users = this.users.filter((elem) => elem.email !== email);
  }
}
