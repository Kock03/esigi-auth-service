import { IsNotEmpty } from 'class-validator';
import { ProfilesEntity } from 'src/app/profiles/profiles.entity';

export class UpdateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  profile: ProfilesEntity[];
}
