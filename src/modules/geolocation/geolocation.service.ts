import { HttpService } from '@nestjs/axios';
import { LocationResponse } from './location.response';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class GeolocalizationService {
  constructor(private httpService: HttpService) {}

  async getLocation(ip: string) {
    const { data } = await firstValueFrom(
      this.httpService.request<LocationResponse>({ params: { ip } }).pipe(
        catchError(() => {
          throw new HttpException(
            'geolocalization api error',
            HttpStatus.FAILED_DEPENDENCY,
          );
        }),
      ),
    );
    return data;
  }
}
