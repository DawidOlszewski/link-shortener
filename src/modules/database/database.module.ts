import { ObjectionModule } from '@willsoto/nestjs-objection';
import { Module } from '@nestjs/common';
import config from './db.config';

@Module({
  imports: [
    ObjectionModule.register({
      config,
    }),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
