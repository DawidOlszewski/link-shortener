import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { LinksModule } from '@links/links.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DevicesModule } from '@devices/devices.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

//TODO: add expiration date to task, add created_at, add ip to visit, errors

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    DevicesModule,
    LinksModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
