import { IsNotEmpty } from 'class-validator';
import { UsersEntity } from 'src/app/users/users.entity';

export class CreateProfileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: UsersEntity[];
}
