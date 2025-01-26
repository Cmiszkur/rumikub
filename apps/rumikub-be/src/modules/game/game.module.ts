import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GameService } from './services/game.service';
import { TileModule } from '../tile/tile.module';
import { GameController } from './controllers/game.controller';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), TileModule, PlayerModule],
  providers: [GameService],
  exports: [TypeOrmModule],
  controllers: [GameController],
})
export class GameModule {}
