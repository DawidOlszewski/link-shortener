import { DevicesService } from '@devices/devices.service';
import {
  Injectable,
  CanActivate,
  NotFoundException,
  ExecutionContext,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import getenv from 'getenv';

@Injectable()
export class DevGuard implements CanActivate {
  constructor(
    private devicesService: DevicesService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    if (getenv('ENV') !== 'dev') {
      throw new NotFoundException();
    }
    const ip = context.switchToHttp().getRequest().ip;
    const currentUser = await this.usersService.getByEmail('dawid@gmail.com');
    await this.devicesService.createIfNotExist({ ip, user: currentUser });

    return true;
  }
}
