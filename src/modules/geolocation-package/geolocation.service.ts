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
          transformResponse: (res) => res.data,
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

    return camelcaseKeys<LocationApiResponse>(data);
  }
}
