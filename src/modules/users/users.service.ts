import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async registerUser(registerUser: RegisterUserDto) {
    return this.usersRepo.registerUser(registerUser);
  }

  async activateUser(email: string) {
    await this.usersRepo.activateUser(email);
  }

  async getByEmail(email: string) {
    return this.usersRepo.getByEmail(email);
  }

  async getById(id: string) {
    return this.usersRepo.getById(id);
  }
}
