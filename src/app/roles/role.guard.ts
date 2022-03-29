import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log("🚀 ~ file: role.guard.ts ~ line 10 ~ RolesGuard ~ canActivate ~ roles", roles)
    if (!roles) {
      return true;
    }
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log("🚀 ~ file: role.guard.ts ~ line 16 ~ RolesGuard ~ canActivate ~ jwt", jwt)
    const request = context.switchToHttp().getRequest();
    console.log("🚀 ~ file: role.guard.ts ~ line 15 ~ RolesGuard ~ canActivate ~ request", request)
    const user = request.user;
    // return matchRoles(roles, user.profiles );
    return true;
    
  }

}

function matchRoles(roles: string[], profiles: any): boolean {
  return  profiles.find(role => roles.includes(role.name))
}

