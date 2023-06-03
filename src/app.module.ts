import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { LinksModule } from '@links/links.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DevicesModule } from '@devices/devices.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AllExceptionsFilter } from './errors.filter';

//TODO: add expiration date to task, add created_at

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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
