import { Injectable } from '@nestjs/common';
import { DevicesRespository } from './devices.repository';
import { User } from '@users/user.model';

@Injectable()
export class DevicesService {
  constructor(private devicesRepo: DevicesRespository) {}

  async createIfNotExist({ ip, user }: { ip: string; user?: User }) {
    const newDevice = await this.devicesRepo.createIfNotExist({ ip });
    if (!user) {
      return newDevice;
    }
    return this.addUser({ ip, user });
  }

  async addUser({ ip, user }: { ip: string; user: User }) {
    return this.devicesRepo.addUser({ ip, user });
  }
}
