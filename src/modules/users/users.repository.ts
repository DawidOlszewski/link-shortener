import { Inject } from '@nestjs/common';
import { User } from './user.model';
import { RegisterUser } from './register-user.interface';

export class UsersRepository {
  constructor(@Inject(User) private userModel: typeof User) {}

  async registerUser(registerUser: RegisterUser) {
    return this.userModel.query().insert(registerUser);
  }
}
