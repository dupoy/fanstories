import { FandomEntity } from '../../../entities/fandom.entity';

export type FandomType = Omit<FandomEntity, 'slugifyTitle'>;
