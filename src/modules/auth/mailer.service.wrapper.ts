import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import getenv from 'getenv';

@Injectable()
export class MailerServiceWrapper {
  constructor(@Inject(MailerService) private mailerService: MailerService) {}

  async sendMail(destination: string, href: string) {
    if (getenv('ENV') == 'prod') {
      await this.mailerService.sendMail(this.createMail(destination, href));
    } else {
      console.log({ destination, href });
    }
  }

  createMail(destination: string, href: string) {
    return {
      to: getenv('ENV') == 'prod' ? destination : getenv('DEFAULT_EMAIL'),
      subject: 'authorization link',
      text: `click to authorize: ${href}`,
      html: `click to authorize: <a href="${href}">here</a>`,
    };
  }
}
