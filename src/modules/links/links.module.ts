import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksContoller } from './links.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Link } from './link.model';
import { Visit } from './visit.model';
import { LinksRepository } from './links.repository';
import { GeolocationModule } from '../geolocation/geolocation.module';
import getenv from 'getenv';

@Module({
  providers: [LinksService, LinksRepository],
  controllers: [LinksContoller],
  imports: [
    ObjectionModule.forFeature([Link, Visit]),
    GeolocationModule.register({
      key: getenv('GEOLOCALIZATION_API_KEY'),
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
})
export class LinksModule {}
