import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { Repository } from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>
  ) {}

  async createPlayer(game: Game, name: string): Promise<Player> {
    const player = this.playerRepository.create({ game, name });
    return this.playerRepository.save(player);
  }

}
