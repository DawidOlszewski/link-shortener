import { Link } from '@links/link.model';
import { OwnerGuard } from './owner.guard';
import { Inject } from '@nestjs/common';

export class LinkOwnerGuard extends OwnerGuard<'createdById'> {
  constructor(@Inject(Link) linkModel: typeof Link) {
    super(linkModel, 'id', 'createdById');
  }
}
