import { Inject } from '@nestjs/common';
import { Visit } from './visit.model';
import { Device } from '@devices/device.model';
import { Link } from './link.model';
import { Location } from 'src/modules/geolocation-package/location.type';

export class VisitsRepository {
  constructor(@Inject(Visit) private visitModel: typeof Visit) {}

  async handleVisit({
    location,
    device,
    link,
  }: {
    link: Link;
    location: Location;
    device: Device;
  }) {
    await this.visitModel.query().insert({
      deviceId: device.id,
      linkId: link.id,
      location: location,
    });

    return this.visitModel.query();
  }
}
