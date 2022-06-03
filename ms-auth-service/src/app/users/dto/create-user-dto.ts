import { MessagesHelper } from './../../../helpers/messages.helper';
import { RegExHelper } from './../../../helpers/regex.helper';
import { IsEmail, IsNotEmpty, Matches } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string

    @IsNotEmpty()
    lastName: string

    @IsNotEmpty()
    // @Matches(RegExHelper.password, {message: MessagesHelper.PASSWORD_INVALID})
    password: string
}