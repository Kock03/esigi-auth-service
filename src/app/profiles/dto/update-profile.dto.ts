import { IsNotEmpty } from 'class-validator';
import { UsersEntity } from 'src/app/users/users.entity';

export class UpdateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: UsersEntity[];
}
