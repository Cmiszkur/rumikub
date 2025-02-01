import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>
  ) {}

  async createPlayer(gameId: number, name: string): Promise<Player> {
    const player = this.playerRepository.create({ game: { game_id: gameId }, name });
    return this.playerRepository.save(player);
  }

}
