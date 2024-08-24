import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparing } from '../common/utils/hashing-data';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async getPayload(
    userId: number,
    userName: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, username: userName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(data: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const { email, password } = data;
    const user = await this.userService.getUser({ email });

    if (!(await comparing(password, user.password))) {
      throw new UnauthorizedException();
    }

    return await this.getPayload(user.id, user.name);
  }

  async signUp(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
  }): Promise<any> {
    return;
  }
}
