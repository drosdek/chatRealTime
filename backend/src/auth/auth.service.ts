import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt-payload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createToken(username: string, password: string): Promise<string> {
    const payload: IJwtPayload = { password, username };
    return this.jwtService.sign(payload);
  }

  async validateUser(
    username: string,
    password: string,
    ip: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    await this.userService.historicLogin(user.id, ip);
    const payload = await this.createToken(user.username, user.password);
    return { access_token: payload.toString() };
  }
}
