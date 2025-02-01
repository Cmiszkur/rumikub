import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, GameState } from '../entities/game.entity';
import { Repository } from 'typeorm';
import { TileService } from '../../tile/services/tile.service';
import { PlayerService } from '../../player/services/player.service';
import { BasicGameResponseDto } from '../dtos/basic-game-response.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private tileService: TileService,
    private playerService: PlayerService
  ) {}

  async getGame(
    gameId: number,
    relations: ('players' | 'sets' | 'tileTemplates' | 'tiles')[] = [
      'players',
      'sets',
      'tileTemplates',
      'tiles',
    ]
  ): Promise<Game | null> {
    return this.gameRepository.findOne({
      where: { game_id: gameId },
      relations,
    });
  }

  async createGame(hostUsername: string): Promise<BasicGameResponseDto> {
    const game = this.gameRepository.create();
    const savedGame = await this.gameRepository.save(game);
    await this.tileService.saveTileTemplates(savedGame);
    await this.playerService.createPlayer(game.game_id, hostUsername);
    return this.createBasicGameResponseDto(await this.getGame(savedGame.game_id, ['players']));
  }

  async startGame(gameId: number): Promise<BasicGameResponseDto> {
    const game = await this.getGame(gameId);

    if (!game) {
      throw new BadRequestException('Game not found');
    }

    if (game.status !== GameState.WAITING) {
      throw new BadRequestException('Invalid game status');
    }

    await this.tileService.drawTilesForPlayers(game);
    const savedGame = await this.gameRepository.save({
      ...(await this.getGame(gameId)),
      status: GameState.IN_PROGRESS,
    });

    return this.createBasicGameResponseDto(savedGame);
  }

  async deleteGame(gameId: number): Promise<boolean> {
    return !!(await this.gameRepository.delete(gameId)).affected;
  }

  async joinGame(gameId: number, username: string): Promise<BasicGameResponseDto> {
    const game = await this.getGame(gameId, ['players']);

    if (!game) {
      throw new BadRequestException('Game not found');
    }

    if (game.players.length >= 4) {
      throw new BadRequestException('A game can only have up to 4 players');
    }

    await this.playerService.createPlayer(gameId, username);
    return this.createBasicGameResponseDto(await this.getGame(gameId, ['players']));
  }

  private createBasicGameResponseDto(game: Game): BasicGameResponseDto {
    return {
      gameId: game.game_id,
      gameStatus: game.status,
      players: game.players.map(p => ({ name: p.name, player_id: p.player_id }))
    }
  }
}
