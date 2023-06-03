import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksManagerController } from './links.manger.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Link } from './link.model';
import { Visit } from './visit.model';
import { LinksRepository } from './links.repository';
import { GeolocationModule } from '../geolocation-package/geolocation.module';
import getenv from 'getenv';
import { VisitsService } from './visit.service';
import { VisitsRepository } from './visit.repository';
import { LinkOwnerGuard } from 'src/modules/auth/guards/link-owner.guard';
import { DevicesModule } from '@devices/devices.module';
import { LinksController } from './links.controller';

@Module({
  providers: [
    LinksService,
    LinksRepository,
    VisitsService,
    VisitsRepository,
    LinkOwnerGuard,
  ],
  controllers: [LinksManagerController, LinksController],
  imports: [
    ObjectionModule.forFeature([Link, Visit]),
    GeolocationModule.register({
      key: getenv('GEOLOCALIZATION_API_KEY'),
      timeout: 5000,
      maxRedirects: 5,
    }),
    DevicesModule,
  ],
})
export class LinksModule {}
