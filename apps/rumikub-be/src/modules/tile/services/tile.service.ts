import { Injectable } from '@nestjs/common';
import { TileTemplate } from '../entities/tile-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Injectable()
export class TileService {

  constructor(
    @InjectRepository(TileTemplate) private readonly tileTemplateRepository: Repository<TileTemplate>
  ) {}

  private createTileTemplate(
    game: Game,
    data: Omit<TileTemplate, 'game' | 'tile_id'>
  ): TileTemplate {
    return this.tileTemplateRepository.create({ ...data, game: game });
  }

  public async saveTileTemplates(game: Game): Promise<TileTemplate[]> {
    const tileTemplates = [
      this.createTileTemplate(game, { color: 'black', quantity: 1, isJoker: true }),
      this.createTileTemplate(game, { color: 'red', quantity: 1, isJoker: true })
    ];
    for(let i = 1; i <= 13; i++) {
      tileTemplates.push(
        this.createTileTemplate(game, { value: i, color: 'blue', quantity: 2, isJoker: false }),
        this.createTileTemplate(game, { value: i, color: 'red', quantity: 2, isJoker: false }),
        this.createTileTemplate(game, { value: i, color: 'orange', quantity: 2, isJoker: false }),
        this.createTileTemplate(game, { value: i, color: 'black', quantity: 2, isJoker: false }),
      )
    }
    return await this.tileTemplateRepository.save(tileTemplates);
  }
}
