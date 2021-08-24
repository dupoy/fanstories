import { IFandom } from '../../../types/fandom.interface';

export interface IGetFandomResponse {
  fandoms: IFandom[]
  fandomCount: number
}
