import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { GroupSet } from '../../group-set/entities/group-set.entity';
import { Player } from '../../player/entities/player.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Tile {
  @PrimaryGeneratedColumn()
  tile_id: number;

  @ManyToOne(() => Game, (game) => game.tiles, { onDelete: 'CASCADE' })
  game: Game;

  @ManyToOne(() => GroupSet, (set) => set.tiles, { onDelete: 'SET NULL', nullable: true })
  set?: GroupSet;

  @ManyToOne(() => Player, (player) => player.tiles, { onDelete: 'SET NULL', nullable: true })
  player?: Player;

  @Column()
  value: number; // Tile value (1-13)

  @Column()
  color: string; // Tile color (e.g., 'red', 'blue', etc.)
}
