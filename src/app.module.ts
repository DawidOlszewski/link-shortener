import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { LinksModule } from '@links/links.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, LinksModule, UsersModule, AuthModule],
})
export class AppModule {}
