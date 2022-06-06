import { MessagesHelper } from './../../../helpers/messages.helper';
import { RegExHelper } from './../../../helpers/regex.helper';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ProfilesEntity } from 'src/app/profiles/profiles.entity';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_INVALID })
  password: string;

  @IsNotEmpty()
  profile: ProfilesEntity[];
}
