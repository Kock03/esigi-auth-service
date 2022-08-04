import { UsersEntity } from './../app/users/users.entity';
import { UsersService } from './../app/users/users.service';
import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(login: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOneOrFail({ login });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: UsersEntity) {
    const payload = { sud: user.id, login: user.login };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  verifyToken(jwt: any) {
    const verify = this.jwtService.verify(jwt);
    if (verify) {
      return true;
    }
  }
}
