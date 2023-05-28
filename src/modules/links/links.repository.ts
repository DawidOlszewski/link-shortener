import { Inject, NotFoundException } from '@nestjs/common';
import { Link } from './link.model';
import { User } from '@users/user.model';

export class LinksRepository {
  constructor(@Inject(Link) private linkModel: typeof Link) {}

  async generateLink({
    siteUrl,
    link,
    createdBy,
    expirationDate,
  }: {
    siteUrl: string;
    link: string;
    createdBy: User;
    expirationDate?: Date;
  }) {
    const l = await this.linkModel.query().insert({
      siteUrl,
      link,
      expirationDate,
      createdById: createdBy.id,
    });
    return l;
  }

  async getRedirectionUrl(link: string) {
    const redirectionUrl = await this.linkModel.query().findOne({ link });
    if (!redirectionUrl) {
      throw new NotFoundException();
    }

    return redirectionUrl;
  }
}
