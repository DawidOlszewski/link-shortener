import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class LinksService {
  private tempDict = new Map<string, string>([
    ['google', 'https://www.google.com'],
  ]);
  getRedirectionLink(link: string) {
    return this.tempDict.get(link) ?? 'https://www.facebook.com/';
  }

  async generateLink(link: string) {
    const buffer = await promisify(randomBytes)(10);
    const shotenedLink = buffer.toString('hex');
    this.tempDict.set(shotenedLink, link);
    return shotenedLink;
  }
}
