import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { LinksRepository } from './links.repository';
import { User } from '@users/user.model';

@Injectable()
export class LinksService {
  constructor(private linksRepo: LinksRepository) {}

  getRedirectionLink(link: string) {
    return this.linksRepo.getRedirectionUrl(link);
  }

  async generateLink({
    siteUrl,
    link,
    createdBy,
  }: {
    link?: string;
    siteUrl: string;
    createdBy: User;
  }) {
    let shotenedLink = '';
    if (!link) {
      shotenedLink = await this.createRandomLink();
    }
    return this.linksRepo.generateLink({
      link: link ?? shotenedLink,
      createdBy, //TODO: take that from context (async local storage)
      siteUrl,
    });
  }

  async getRedirectionUrl(link: string) {
    return this.linksRepo.getRedirectionUrl(link);
  }

  //its to small to put it in different class,
  //put it in separate file, if it grows up
  async createRandomLink() {
    const randomBuffer = await promisify(randomBytes)(10);
    const link = randomBuffer.toString('hex');
    return link;
  }
}
