import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { DeleteGameResponseDto } from '../dtos/delete-game-response.dto';
import { JoinGameRequestDto } from '../dtos/join-game-request.dto';
import { GameIdRequestDto } from '../dtos/game-id-request.dto';
import { BasicGameResponseDto } from '../dtos/basic-game-response.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create')
  async createGame(@Body('username') username: string): Promise<BasicGameResponseDto> {
    return this.gameService.createGame(username);
  }

  @Post('delete')
  async deleteGame(@Body() deleteGameDto: GameIdRequestDto): Promise<DeleteGameResponseDto> {
    return { deleted: await this.gameService.deleteGame(deleteGameDto.gameId) };
  }

  @Post('join')
  async joinGame(@Body() joinGameDto: JoinGameRequestDto): Promise<BasicGameResponseDto> {
    return await this.gameService.joinGame(joinGameDto.gameId, joinGameDto.username);
  }

  @Post('start')
  async startGame(@Body() startGameDto: GameIdRequestDto): Promise<BasicGameResponseDto> {
    return await this.gameService.startGame(startGameDto.gameId);
  }
}
