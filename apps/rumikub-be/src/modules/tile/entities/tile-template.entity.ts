import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Game } from '../../game/entities/game.entity';

@Entity()
export class TileTemplate {
  @PrimaryGeneratedColumn()
  tile_id: number;

  @ManyToOne(() => Game, (game) => game.tileTemplates, { onDelete: 'CASCADE' })
  game: Game;

  @Column({ nullable: true })
  value?: number; // Tile value (1-13)

  @Column()
  color: string; // Tile color (e.g., 'red', 'blue', etc.)

  @Column()
  quantity: number;

  @Column()
  isJoker: boolean;
}
