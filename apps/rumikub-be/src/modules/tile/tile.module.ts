import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tile } from './entities/tile.entity';
import { TileService } from './services/tile.service';
import { TileTemplate } from './entities/tile-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tile, TileTemplate])],
  providers: [TileService],
  exports: [TypeOrmModule, TileService]
})
export class TileModule {}
