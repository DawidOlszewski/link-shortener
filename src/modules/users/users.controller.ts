import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUser } from './register-user.interface';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async registerUser(@Body() req: RegisterUser) {
    return this.usersService.registerUser(req);
  }
}
