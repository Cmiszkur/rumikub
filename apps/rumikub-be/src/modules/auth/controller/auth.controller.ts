import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('guest-login')
  async guestLogin(@Body() guestLogin: { username: string }) {
    const token = this.authService.generateGuestToken(guestLogin.username);
    return { access_token: token };
  }
}
