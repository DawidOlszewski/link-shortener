import { Inject, NotFoundException } from '@nestjs/common';
import { Link } from './link.model';
import { User } from '@users/user.model';

export class LinksRepository {
  constructor(@Inject(Link) private linkModel: typeof Link) {}

  async generateLink({
    siteUrl,
    shortenedUrl,
    createdBy,
    expirationDate,
  }: {
    siteUrl: string;
    shortenedUrl: string;
    createdBy: User;
    expirationDate?: Date;
  }) {
    return this.linkModel.query().insertGraph({
      siteUrl,
      shortenedUrl,
      expirationDate,
      createdById: createdBy.id,
    });
  }

  async getRedirectionUrl(shortenedUrl: string) {
    const redirectionUrl = await this.linkModel
      .query()
      .findOne({ shortenedUrl });

    if (!redirectionUrl) {
      throw new NotFoundException();
    }

    return redirectionUrl;
  }

  async getUsersLinks(createdBy: User) {
    return this.linkModel.query().modify('searchByCreator', createdBy);
  }

  async getById(id: string) {
    return this.linkModel.query().findById(id).withGraphFetched('visits');
  }
}
