import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { environment } from '../environments/environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSetModule } from './group-set/group-set.module';
import { TileModule } from './tile/tile.module';
import { PlayerModule } from './player/player.module';
import * as process from 'node:process';
import { GameModule } from './game/game.module';

/**
 * Config files should like this:
 * DATABASE_USER=
 * DATABASE_PASSWORD=
 * DATABASE_NAME=
 * JWT_SECRET=
 */
@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      envFilePath: `${
        environment.production ? 'production' : 'apps/rumikub-be/development'
      }.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: !environment.production,
    }),
    GroupSetModule,
    TileModule,
    PlayerModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(__dirname + '/**/entities/*.entity{.ts,.js}');
  }
}
