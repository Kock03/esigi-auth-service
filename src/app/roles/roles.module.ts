import { Module } from '@nestjs/common';
import { RoleService } from './roles.service';
import { RoleController } from './roles.controller';
import { RoleEntity } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
