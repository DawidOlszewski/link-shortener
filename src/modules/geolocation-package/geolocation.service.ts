import { HttpService } from '@nestjs/axios';
import { LocationApiResponse } from './location.api.response';
import { Location } from './location.type';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import camelcaseKeys from '@cjs-exporter/camelcase-keys';
//above package is an attempt to circumvent the problem of "CommonJS module imports another CommonJS module"

@Injectable()
export class GeolocalizationService {
  constructor(private httpService: HttpService) {}

  async getLocation(ip: string): Promise<Location> {
    const { data } = await firstValueFrom(
      this.httpService
        .request<LocationApiResponse>({
          params: { ip },
        })
        .pipe(
          catchError((error) => {
            console.log(error);
            throw new HttpException(
              'geolocalization api error',
              HttpStatus.FAILED_DEPENDENCY,
            );
          }),
        ),
    );

    const { city, country, longitude, latitude, continent } =
      camelcaseKeys<LocationApiResponse>(data);

    return { city, country, longitude, latitude, continent };
  }
}
