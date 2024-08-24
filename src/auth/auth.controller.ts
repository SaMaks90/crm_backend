import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorator/public.decorator';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() data: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUser({ email: data.email });

    if (!user) {
      throw new HttpException(
        'I don`t find user this email',
        HttpStatus.NO_CONTENT,
      );
    }

    return await this.authService.signIn(data);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(
    @Body()
    data: {
      email: string;
      password: string;
      name: string;
      role?: string;
    },
  ): Promise<any> {
    return await this.authService.signUp(data);
  }
}
