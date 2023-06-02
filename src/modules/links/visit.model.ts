import { Model } from 'objection';
import { Device } from '@devices/device.model';
import { Link } from './link.model';
import { Location } from '@geolocation/location.type';

export class Visit extends Model {
  id!: string;
  linkId!: string;
  deviceId!: string;
  location!: Location;
  device?: Device;
  link?: Link;

  static get tableName() {
    return 'visits';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['deviceId', 'location', 'linkId'],
      properties: {
        id: { type: 'string' },
        deviceId: { type: 'string' },
        linkId: { type: 'string' },
        location: {
          //TODO: change to be correct
          type: 'object',
          // properties: {
          //   street: { type: 'string' },
          //   city: { type: 'string' },
          //   zipCode: { type: 'string' },
          // },
        },
      },
    };
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
