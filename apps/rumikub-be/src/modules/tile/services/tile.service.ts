import { Injectable } from '@nestjs/common';
import { TileTemplate } from '../entities/tile-template.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { Tile } from '../entities/tile.entity';

@Injectable()
export class TileService {

  constructor(
    @InjectRepository(TileTemplate) private readonly tileTemplateRepository: Repository<TileTemplate>,
    @InjectRepository(Tile) private readonly tileRepository: Repository<Tile>,
  ) {}

  async getTiles(gameId: number, playerId: number, username?: string): Promise<Tile[]> {
    return this.tileRepository.find({
      where: {
        game: { game_id: gameId },
        player: { player_id: playerId, name: username }
      }
    });
  }

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

  async drawTilesForPlayers(game: Game): Promise<void> {
    const tileTemplates = game.tileTemplates;

    const drawnTiles: Tile[] = [];
    const updatedTemplates: TileTemplate[] = [];
    const deletedTemplates: TileTemplate[] = [];

    game.players.forEach(player => {
      for (let i = 0; i < 14; i++) {
        // Step 3: Randomly select a tile template (you can improve randomness here)
        const randomIndex = Math.floor(Math.random() * tileTemplates.length);
        const selectedTemplate = tileTemplates[randomIndex];

        const tile = this.tileRepository.create({
          value: selectedTemplate.value,
          color: selectedTemplate.color,
          game: { game_id: game.game_id },
          player,
        });

        selectedTemplate.quantity--;

        if (selectedTemplate.quantity <= 0) {
          deletedTemplates.push(...tileTemplates.splice(randomIndex, 1)); // Remove template if out of tiles
        }

        drawnTiles.push(tile);
        updatedTemplates.push();
      }
    })

    await this.tileRepository.save(drawnTiles);
    await this.tileTemplateRepository.save(updatedTemplates);
    if (deletedTemplates.length > 0) {
      await this.tileTemplateRepository.delete(deletedTemplates.map(t => t.tile_id));
    }
  }
}
