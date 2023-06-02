import { CamelCaseKeys } from 'camelcase-keys';
import { LocationApiResponse } from './location.api.response';

export type Location = CamelCaseKeys<LocationApiResponse>;
