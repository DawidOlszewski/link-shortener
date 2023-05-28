import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksContoller } from './links.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Link } from './link.model';
import { Visit } from './visit.model';
import { LinksRepository } from './links.repository';

@Module({
  providers: [LinksService, LinksRepository],
  controllers: [LinksContoller],
  imports: [ObjectionModule.forFeature([Link, Visit])],
})
export class LinksModule {}
