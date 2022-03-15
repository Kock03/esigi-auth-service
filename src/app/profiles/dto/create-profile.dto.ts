import { IsNotEmpty, IsOptional } from 'class-validator';
import { RoleEntity } from 'src/app/roles/role.entity';
import { UsersEntity } from 'src/app/users/users.entity';

export class CreateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: RoleEntity;

  @IsOptional()
  user: UsersEntity[];
}
