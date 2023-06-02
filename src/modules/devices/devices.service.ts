import { Injectable } from '@nestjs/common';
import { DevicesRespository } from './devices.repository';

@Injectable()
export class DevicesService {
  constructor(private devicesRepo: DevicesRespository) {}

  async createIfNotExist({ ip, userId }: { ip: string; userId?: string }) {
    return this.devicesRepo.createIfNotExist({ ip, userId });
  }
}
