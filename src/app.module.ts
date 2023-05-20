import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { LinksModule } from '@links/links.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [DatabaseModule, LinksModule, UsersModule],
})
export class AppModule {}
