import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { Game } from '../entities/game.entity';
import { DeleteGameRequestDto } from '../dtos/delete-game-request.dto';
import { DeleteGameResponseDto } from '../dtos/delete-game-response.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('create')
  async createRoom(@Body('username') username: string): Promise<Game> {
    return this.gameService.createGame(username);
  }

  @Post('delete')
  async deleteGame(@Body() deleteGameDto: DeleteGameRequestDto): Promise<DeleteGameResponseDto> {
    return { deleted: await this.gameService.deleteGame(deleteGameDto.gameId) };
  }
}
