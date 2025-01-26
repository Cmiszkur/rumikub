import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';
import { Repository } from 'typeorm';
import { TileService } from '../../tile/services/tile.service';
import { PlayerService } from '../../player/services/player.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private tileService: TileService,
    private playerService: PlayerService,
  ) {}

  async createGame(hostUsername: string): Promise<Game> {
    const game = this.gameRepository.create();
    const savedGame = await this.gameRepository.save(game);
    await this.tileService.saveTileTemplates(savedGame);
    await this.playerService.createPlayer(game, hostUsername);
    return this.gameRepository.findOne({ where: { game_id: savedGame.game_id }, relations: ['players', 'sets', 'tileTemplates', 'tiles'] });
  }

  async deleteGame(gameId: number): Promise<boolean> {
    return !!(await this.gameRepository.delete(gameId)).affected;
  }
}
