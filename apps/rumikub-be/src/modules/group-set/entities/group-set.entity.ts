import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Game } from '../../game/entities/game.entity';
import { Tile } from '../../tile/entities/tile.entity';

export enum GroupSetType {
  RUN = 'run',
  GROUP = 'group'
}

@Entity()
export class GroupSet {
  @PrimaryGeneratedColumn()
  set_id: number;

  @ManyToOne(() => Game, (game) => game.sets, { onDelete: 'CASCADE' })
  game: Game;

  @OneToMany(() => Tile, (tile) => tile.set)
  tiles: Tile[];

  @Column({
    type: 'enum',
    enum: GroupSetType,
  })
  type: GroupSetType;
}
