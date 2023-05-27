import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './magic-login.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'password',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, MagicLoginStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
