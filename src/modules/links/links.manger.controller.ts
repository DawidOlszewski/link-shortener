import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CurrentUser } from '@users/decorators/current-user.decorator';
import { User } from '@users/user.model';
import { LinkOwnerGuard } from 'src/modules/auth/guards/link-owner.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { GenLinkDto } from './dtos/gen-link.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('links')
@ApiTags('links')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class LinksManagerController {
  constructor(private linkService: LinksService) {}

  @Post()
  async genLink(
    @Body() genLinkDto: GenLinkDto,
    @CurrentUser() createdBy: User,
  ) {
    const newLink = await this.linkService.generateLink({
      ...genLinkDto,
      createdBy: createdBy,
    });
    return newLink;
  }

  @Get()
  async getLinks(@CurrentUser() user: User) {
    return this.linkService.getUsersLinks(user);
  }

  @Get('/:id')
  @UseGuards(LinkOwnerGuard)
  async getLink(@Param('id', ParseUUIDPipe) id: string) {
    return this.linkService.getById(id);
  }
}
