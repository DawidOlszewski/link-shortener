import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUser } from './register-user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async registerUser(registerUser: RegisterUser) {
    return this.usersRepo.registerUser(registerUser);
  }
}
