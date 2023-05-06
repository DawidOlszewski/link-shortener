import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { LinkService } from './link.service';

@Controller()
export class LinkContoller {
  constructor(private linkService: LinkService) {}

  @Get(':link')
  @Redirect()
  async redirect(@Param('link') link: string, @Ip() ip: string) {
    console.log(ip);

    const url = this.linkService.getRedirectionLink(link);
    return { url };
  }

  @Post('genLink')
  async genLink(@Body('link') link: string) {
    const newLink = this.linkService.generateLink(link);
    return { newLink };
  }
}
