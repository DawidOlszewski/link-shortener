import { Inject, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { RegisterUserDto } from './dtos/register-user.dto';
import { log } from 'console';

export class UsersRepository {
  constructor(@Inject(User) private userModel: typeof User) {}

  async registerUser(registerUser: RegisterUserDto) {
    log(registerUser);

    return this.userModel.query().insert(registerUser);
  }

  async activateUser(email: string) {
    await this.userModel.query().patch({ active: true }).findOne({ email });
  }

  async getByEmail(email: string) {
    const user = await this.userModel.query().findOne({ email });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.query().findOne({ id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }
}
