import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPlayerTilesDto {
  @Type(() => Number)
  @IsInt()
  playerId: number;

  @Type(() => Number)
  @IsInt()
  gameId: number;
}
