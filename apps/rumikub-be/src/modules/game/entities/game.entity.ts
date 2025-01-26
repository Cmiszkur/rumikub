import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupSet } from '../../group-set/entities/group-set.entity';
import { Player } from '../../player/entities/player.entity';
import { Tile } from '../../tile/entities/tile.entity';
import { TileTemplate } from '../../tile/entities/tile-template.entity';

export enum GameState {
  WAITING = 'waiting',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  ERROR = 'error'
}

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  game_id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Player, (player) => player.game, { cascade: true })
  players: Player[];

  @OneToMany(() => GroupSet, (set) => set.game, { cascade: true })
  sets: GroupSet[];

  @OneToMany(() => TileTemplate, (tile) => tile.game, { cascade: true })
  tileTemplates: TileTemplate[];

  @OneToMany(() => Tile, (tile) => tile.game, { cascade: true })
  tiles: Tile[];

  @Column({
    type: "enum",
    enum: GameState,
    default: GameState.WAITING,
  })
  status: GameState;
}
