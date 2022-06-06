import { IsNotEmpty, IsOptional } from "class-validator";
import { ProfilesEntity } from "src/app/profiles/profiles.entity";

export class CreateRoleDto {
  
    @IsNotEmpty()
    name: string;
  
    @IsOptional()
    profiles: ProfilesEntity;
}
