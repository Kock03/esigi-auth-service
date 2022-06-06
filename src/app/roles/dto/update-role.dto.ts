import { IsOptional } from "class-validator";
import { ProfilesEntity } from "src/app/profiles/profiles.entity";

export class UpdateRoleDto {
    
    @IsOptional()
    name: string;
  
    @IsOptional()
    profiles: ProfilesEntity;
}
