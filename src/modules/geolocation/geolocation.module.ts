import { Module } from '@nestjs/common';
import { Options } from './options.type';
import { HttpModule } from '@nestjs/axios';
import { geolocatizationApiUrl } from './constants';
import { GeolocalizationService } from './geolocation.service';

@Module({})
export class GeolocationModule {
  public static register({ key, timeout, maxRedirects }: Options) {
    return {
      module: GeolocationModule,
      imports: [
        HttpModule.register({
          timeout,
          maxRedirects,
          method: 'get',
          baseURL: geolocatizationApiUrl,
          params: {
            api_key: key,
          },
        }),
      ],
      providers: [GeolocalizationService],
      exports: [GeolocalizationService],
    };
  }
}
