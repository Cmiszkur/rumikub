import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupSet } from './entities/group-set.entity';
import { GroupSetService } from './services/group-set.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupSet])],
  providers: [GroupSetService],
  exports: [TypeOrmModule]
})
export class GroupSetModule {}
