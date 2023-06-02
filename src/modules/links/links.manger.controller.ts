import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LinksService } from './links.service';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '@users/user.model';
import { AuthGuard } from '@nestjs/passport';
import { LinkOwnerGuard } from 'src/guards/link-owner.guard';

@Controller('links')
export class LinksManagerController {
  constructor(private linkService: LinksService) {}

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
    return newLink;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getLinks(@CurrentUser() user: User) {
    return this.linkService.getUsersLinks(user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), LinkOwnerGuard)
  async getLink(@Param('id') id: string) {
    return this.linkService.getById(id);
  }
}
