import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateGuestToken(username: string): string {
    return this.jwtService.sign({ username });
  }
}
