import { GeolocalizationService } from '@geolocation/geolocation.service';
import { Link } from './link.model';
import { VisitsRepository } from './visit.repository';
import { Location } from '@geolocation/location.type';
import { DevicesService } from '@devices/devices.service';
import { Inject } from '@nestjs/common';
import getenv from 'getenv';

export class VisitsService {
  constructor(
    private visitsRepository: VisitsRepository,
    @Inject(GeolocalizationService) private geoService: GeolocalizationService,
    private devicesService: DevicesService,
  ) {}
  async handleVisit({ ip, link }: { ip: string; link: Link }) {
    const location: Location =
      getenv('ENV') === 'prod'
        ? await this.geoService.getLocation(ip)
        : ({ city: 'wroclaw' } as Location);

    const device = await this.devicesService.createIfNotExist({ ip });

    return this.visitsRepository.handleVisit({ location, device, link });
  }
}
