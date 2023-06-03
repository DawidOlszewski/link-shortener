import { DevicesService } from '@devices/devices.service';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@users/user.model';
import { Request } from 'express';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(@Inject(DevicesService) private devicesService: DevicesService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    const ip = request.ip;
    await this.devicesService.addUser({ ip, user });

    return true;
  }
}
