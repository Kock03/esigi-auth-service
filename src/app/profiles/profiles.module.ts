import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesEntity } from './profiles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilesEntity])],
  providers: [ProfilesService],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
