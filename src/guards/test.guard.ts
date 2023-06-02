import { Injectable, CanActivate, BadRequestException } from '@nestjs/common';
import getenv from 'getenv';

@Injectable()
export class DevGuard implements CanActivate {
  canActivate(): boolean {
    if (getenv('ENV') !== 'dev') {
      throw new BadRequestException();
    }
    return true;
  }
}
