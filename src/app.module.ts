import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { LinksModule } from '@links/links.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DevicesModule } from '@devices/devices.module';

//TODO: add expiration date to task, add created_at

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    DevicesModule,
    LinksModule,
  ],
})
export class AppModule {}
