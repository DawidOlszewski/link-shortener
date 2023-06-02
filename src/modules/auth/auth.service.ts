import { User } from '@users/user.model';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { JwtPayload } from './types/jwt-payload.type';

export class AuthService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string) {
    await this.usersService.activateUser(email);

    return this.usersService.getByEmail(email);
  }

  async generateTokens(user: User) {
    const jwtPayload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return { 'access-token': await this.jwtService.signAsync(jwtPayload) };
  }

  async generateTestToken() {
    const user = await this.usersService.getByEmail('dawid@gmail.com');
    return this.generateTokens(user);
  }
}
