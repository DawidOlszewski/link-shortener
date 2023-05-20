import { Inject, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { RegisterUser } from './register-user.interface';

export class UsersRepository {
  constructor(@Inject(User) private userModel: typeof User) {}

  async registerUser(registerUser: RegisterUser) {
    return this.userModel.query().insert(registerUser);
  }

  async activateUser(email: string) {
    await this.userModel.query().patch({ active: true }).findOne({ email });
  }

  async findByEmail(email: string) {
    const user = await this.userModel.query().findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
