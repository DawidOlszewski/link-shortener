import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '@users/user.model';
import { AuthGuard } from '@nestjs/passport';
import { GeolocalizationService } from '../geolocation/geolocation.service';

@Controller()
export class LinksContoller {
  constructor(
    private linkService: LinksService,
    private geolocalizationService: GeolocalizationService,
  ) {}

  @Get(':link')
  @Redirect()
  async redirect(@Param('link') link: string, @Ip() ip: string) {
    console.log('ip: (from link redirect)', ip);
    const geolocFromRedirect = await this.geolocalizationService.getLocation(
      ip,
    );
    console.log({ geolocFromRedirect });
    const { siteUrl: url } = await this.linkService.getRedirectionLink(link);
    return { url };
  }

  @Post('gen-link')
  @UseGuards(AuthGuard('jwt'))
  async genLink(
    @Body() genLinkRequest: { siteUrl: string; link: string },
    @CurrentUser() createdBy: User,
  ) {
    const newLink = await this.linkService.generateLink({
      ...genLinkRequest,
      createdBy: createdBy,
    });
    return { newLink };
  }
}
