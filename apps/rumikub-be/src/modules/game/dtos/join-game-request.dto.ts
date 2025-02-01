import { IsNotEmpty } from 'class-validator';
import { GameIdRequestDto } from './game-id-request.dto';

export class JoinGameRequestDto extends GameIdRequestDto {
  @IsNotEmpty()
  username: string;
}
