import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersRepository, UsersService, UsersModule],
  controllers: [UsersController],
  imports: [ObjectionModule.forFeature([User])],
})
export class UsersModule {}
