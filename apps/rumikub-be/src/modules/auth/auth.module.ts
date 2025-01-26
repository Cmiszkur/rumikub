import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import * as process from 'node:process';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
