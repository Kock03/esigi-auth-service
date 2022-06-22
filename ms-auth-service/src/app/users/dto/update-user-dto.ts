import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  profileId: string;

  @IsOptional()
  password: string;

}
