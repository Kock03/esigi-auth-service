
import { IsOptional } from 'class-validator';


export class UpdateUserDto {
  @IsOptional()
  profileId: string;

  @IsOptional()
  profileName: string;

  @IsOptional()
  password: string;


}
