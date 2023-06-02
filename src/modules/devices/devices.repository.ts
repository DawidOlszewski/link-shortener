import { Inject, Injectable } from '@nestjs/common';
import { Device } from './device.model';

@Injectable()
export class DevicesRespository {
  constructor(@Inject(Device) private deviceModel: typeof Device) {}

  async createIfNotExist({ ip, userId }: { ip: string; userId?: string }) {
    const foundDevice = await this.deviceModel.query().findOne({ ip });

    if (!foundDevice) {
      console.log('lets go');
      return this.deviceModel.query().insertAndFetch({ ip, userId });
    }

    return foundDevice;
  }
}
