import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tile } from './entities/tile.entity';
import { TileService } from './services/tile.service';
import { TileTemplate } from './entities/tile-template.entity';
import { TileController } from './controllers/tile.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tile, TileTemplate]), AuthModule],
  providers: [TileService],
  controllers: [TileController],
  exports: [TypeOrmModule, TileService]
})
export class TileModule {}
