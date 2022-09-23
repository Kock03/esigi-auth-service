import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  inactive: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  office: string;

  @IsNotEmpty()
  collaboratorId: string;


  @IsNotEmpty()
  // @Matches(RegExHelper.password, {message: MessagesHelper.PASSWORD_INVALID})
  password: string;
}
