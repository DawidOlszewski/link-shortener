import { User } from '@users/user.model';
import { UsersService } from '@users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';

export class AuthService {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string) {
    console.log(this.usersService);
    await this.usersService.activateUser(email);

    return this.usersService.getByEmail(email);
  }

  async generateTokens(user: User) {
    //FIXME: it should work
    const user2 = user as any as { id: string; username: string };
    const jwtPayload = { sub: user2.id, username: user2.username };

    return { 'access-token': await this.jwtService.signAsync(jwtPayload) };
  }
}
