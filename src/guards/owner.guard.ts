import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@users/user.model';
import { Model } from 'objection';

@Injectable()
export class OwnerGuard<TName extends string> implements CanActivate {
  constructor(
    private model: typeof Model,
    private paramResourceIdName: string /** name of parameter in request, that stores id of the resource*/,
    private modelOwnerIdPropertyName: TName /** name of model property, that stores id of the owner*/,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    const resourceId = request.params[this.paramResourceIdName];

    if (!resourceId || !user) {
      throw new InternalServerErrorException(); /** 1) before each "ownersGuard" - "authenticationGuard" should be used  2) in "ownersGuard" instance - not fitting paramResourceName is passed */
    }

    const resource = (await this.model
      .query()
      .findById(resourceId)) as Model & { [P in TName]: string };

    if (!resource) {
      throw new NotFoundException("resource with this id doesn't exist");
    }

    if (!resource[this.modelOwnerIdPropertyName]) {
    }

    if (resource[this.modelOwnerIdPropertyName] != user.id) {
      return false;
    }

    return true;
  }
}
