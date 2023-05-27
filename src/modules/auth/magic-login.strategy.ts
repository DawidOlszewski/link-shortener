import Strategy from 'passport-magic-login';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@users/user.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {
    super({
      secret: 'password', //getenv('PASSPORT_SECRET', 'FIXME: deleteme'),
      jwtOptions: {
        expiresIn: '5m',
      },
      callbackUrl: 'http://localhost:3000/login/callback',
      sendMagicLink: async (destination: string, href: string) => {
        //TODO: send email
        console.log({ destination, href });
        this.mailerService.sendMail({
          to: 'dawid.olszewski.dev@gmail.com',
          subject: 'authorization link',
          text: `click to authorize: ${href}`,
          html: `click to authorize: <a href="${href}">here</a>`,
        });
      },
      verify: async (
        payload: { destination: string }, // te rzeczy któe zostały wcześniej wysąłen
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
