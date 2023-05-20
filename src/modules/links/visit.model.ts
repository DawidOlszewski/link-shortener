import { Model } from 'objection';
import { Device } from '@devices/device.model';
import { Link } from './link.model';

export class Visit {
  static get tableName() {
    return 'visitation';
  }

  static get relationMappings() {
    return {
      device: {
        relation: Model.BelongsToOneRelation,
        modelClass: Device,
        join: {
          from: 'visits.linkId',
          to: 'devices.id',
        },
      },

      link: {
        relation: Model.BelongsToOneRelation,
        modelClass: Link,
        join: {
          from: 'visits.deviceId',
          to: 'links.id',
        },
      },
    };
  }
}
