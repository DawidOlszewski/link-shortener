import Strategy from 'passport-magic-login';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@users/user.model';
import getenv from 'getenv';
import { MailerServiceWrapper } from './mailer.service.wrapper';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private mailerService: MailerServiceWrapper,
  ) {
    super({
      secret: getenv('AUTHORIZATION_SECRET'),
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: 'http://localhost:3000/login/callback',
      sendMagicLink: async (destination: string, href: string) => {
        this.mailerService.sendMail(destination, href);
      },
      verify: async (
        payload: { destination: string },
        callback: (exception: Error | null, user: User) => void,
      ) => {
        callback(null, await this.validate(payload));
      },
    });
  }

  async validate({ destination }: { destination: string }) {
    return this.authService.validate(destination);
  }
}
