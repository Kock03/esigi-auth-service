import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    
    return matchRoles(roles, request.user.roles);
  }
}

function matchRoles(roles: string[], userRoles: string[]): boolean {
  return userRoles.some((role) => roles.includes(role));
}
