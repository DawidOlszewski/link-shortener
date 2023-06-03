import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LinksService } from './links.service';
import { CurrentUser } from '@users/decorators/current-user.decorator';
import { User } from '@users/user.model';
import { LinkOwnerGuard } from 'src/modules/auth/guards/link-owner.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('links')
export class LinksManagerController {
  constructor(private linkService: LinksService) {}

  @Post('gen-link')
  @UseGuards(JwtGuard)
  async genLink(
    @Body() genLinkRequest: { siteUrl: string; link: string },
    @CurrentUser() createdBy: User,
  ) {
    const newLink = await this.linkService.generateLink({
      ...genLinkRequest,
      createdBy: createdBy,
    });
    return newLink;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getLinks(@CurrentUser() user: User) {
    return this.linkService.getUsersLinks(user);
  }

  @Get('/:id')
  @UseGuards(JwtGuard, LinkOwnerGuard)
  async getLink(@Param('id') id: string) {
    return this.linkService.getById(id);
  }
}
