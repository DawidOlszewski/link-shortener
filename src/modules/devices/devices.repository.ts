import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Device } from './device.model';
import { User } from '@users/user.model';

@Injectable()
export class DevicesRespository {
  constructor(@Inject(Device) private deviceModel: typeof Device) {}

  async createIfNotExist({ ip }: { ip: string }) {
    const foundDevice = await this.deviceModel.query().findOne({ ip });

    if (!foundDevice) {
      return this.deviceModel.query().insertAndFetch({ ip });
    }

    return foundDevice;
  }

  async addUser({ ip, user }: { ip: string; user: User }) {
    const device = await this.deviceModel.query().findOne({ ip });

    if (!device) {
      throw new NotFoundException('device not found');
    }
    console.log(device);

    const alreadyIn = device.usersId.some((userId) => userId === user.id);

    if (!alreadyIn) {
      return device;
    }

    return device
      .$query()
      .patchAndFetch({ usersId: [...device.usersId, user.id] });
  }
}
