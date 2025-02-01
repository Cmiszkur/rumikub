import { GameState } from '../entities/game.entity';
import { Player } from '../../player/entities/player.entity';

export class BasicGameResponseDto {
  gameStatus: GameState;
  gameId: number;
  players: Omit<Player, 'game' | 'tiles'>[];
}
