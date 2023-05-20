import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksContoller } from './links.controller';

@Module({ providers: [LinksService], controllers: [LinksContoller] })
export class LinksModule {}
