import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FandomEntity } from './fandom.entity';

@Entity('characters')
export class CharacterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => FandomEntity, (fandom) => fandom.characters, {
    eager: false,
  })
  fandom: FandomEntity;
}
