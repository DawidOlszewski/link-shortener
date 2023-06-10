import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async registerUser(@Body() req: RegisterUserDto) {
    return this.usersService.registerUser(req);
  }
}
