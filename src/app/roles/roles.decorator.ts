import { SetMetadata } from "@nestjs/common";
import { RoleEntity } from "./role.entity";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEntity[]) => SetMetadata(ROLES_KEY, roles);