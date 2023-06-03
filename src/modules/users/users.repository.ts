import { Inject, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { RegisterUserDto } from './dtos/register-user.dto';

export class UsersRepository {
  constructor(@Inject(User) private userModel: typeof User) {}

  async registerUser(registerUser: RegisterUserDto) {
    return this.userModel.query().insert(registerUser);
  }

  async activateUser(email: string) {
    await this.userModel.query().patch({ active: true }).findOne({ email });
  }

  async getByEmail(email: string) {
    const user = await this.userModel.query().findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.query().findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
