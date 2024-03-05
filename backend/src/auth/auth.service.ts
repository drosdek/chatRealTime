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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    console.log(user, username, password);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = this.createToken(user.username, user.password);
    return payload;
  }
}
