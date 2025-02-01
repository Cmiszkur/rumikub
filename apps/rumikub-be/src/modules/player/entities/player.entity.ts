import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tile } from '../../tile/entities/tile.entity';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  player_id: number;

  @Column()
  name: string;

  @OneToMany(() => Tile, (tile) => tile.player)
  tiles: Tile[];

  @ManyToOne(() => Game, (game) => game.players, { onDelete: 'CASCADE' })
  game: Game;
}
