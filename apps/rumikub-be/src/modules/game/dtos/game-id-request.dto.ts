import { IsNumber } from 'class-validator';

export class GameIdRequestDto {
  @IsNumber()
  gameId: number;
}
