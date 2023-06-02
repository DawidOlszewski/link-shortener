import { Controller, Get, Ip, Param, Redirect } from '@nestjs/common';
import { LinksService } from './links.service';

@Controller()
export class LinksController {
  constructor(private linksService: LinksService) {}

  @Get(':shortenedUrl')
  @Redirect()
  async redirect(
    @Param('shortenedUrl') shortenedUrl: string,
    @Ip() ip: string,
  ) {
    const url = await this.linksService.handleRedirection({
      shortenedUrl,
      ip,
    });

    console.log(url);

    return {
      url,
    };
  }
}
