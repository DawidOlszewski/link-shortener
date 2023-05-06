import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkContoller } from './link.controller';

@Module({ providers: [LinkService], controllers: [LinkContoller] })
export class LinkModule {}
