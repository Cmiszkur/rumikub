import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { JwtAuthGuard } from '../../guards/guest-jwt.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Replace with a secure secret
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
