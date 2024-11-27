import { Module } from '@nestjs/common';
import { GameMovesGateway } from './gateways/game-moves.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [GameMovesGateway],
  imports: [AuthModule]
})
export class EventsModule {}
