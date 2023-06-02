import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { LinksRepository } from './links.repository';
import { User } from '@users/user.model';
import { VisitsService } from './visit.service';

@Injectable()
export class LinksService {
  constructor(
    private linksRepo: LinksRepository,
    private visitService: VisitsService,
  ) {}

  getRedirectionLink(shortenUrl: string) {
    return this.linksRepo.getRedirectionUrl(shortenUrl);
  }

  async generateLink({
    siteUrl,
    shortenedUrl,
    createdBy,
  }: {
    shortenedUrl?: string;
    siteUrl: string;
    createdBy: User;
  }) {
    return this.linksRepo.generateLink({
      shortenedUrl: shortenedUrl ?? (await this.createRandomLink()),
      createdBy,
      siteUrl,
    });
  }

  async getRedirectionUrl(link: string) {
    return this.linksRepo.getRedirectionUrl(link);
  }

  async handleRedirection({
    shortenedUrl,
    ip,
  }: {
    shortenedUrl: string;
    ip: string;
  }) {
    const link = await this.getRedirectionLink(shortenedUrl);
    await this.visitService.handleVisit({ ip, link });
    const { siteUrl } = link;

    return siteUrl;
  }

  //its to small to put it in different class,
  //put it in separate file, if it grows up
  async createRandomLink() {
    const randomBuffer = await promisify(randomBytes)(10);
    const link = randomBuffer.toString('hex');
    return link;
  }

  async getUsersLinks(createdBy: User) {
    return this.linksRepo.getUsersLinks(createdBy);
  }

  async getById(id: string) {
    return this.linksRepo.getById(id);
  }
}
