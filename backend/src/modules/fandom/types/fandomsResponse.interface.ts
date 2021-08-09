import { FandomType } from './fandom.type';
import { IFandomResponse } from './fandomResponse.interface';

export interface IFandomsResponse {
  fandoms: FandomType[];
  fandomCount: number;
}
