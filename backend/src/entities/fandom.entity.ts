import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import slugify from 'slugify';
import { CharacterEntity } from './character.entity';

@Entity('fandoms')
export class FandomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => CharacterEntity, (character) => character.fandom)
  characters: CharacterEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeTitle() {
    this.title = this.title.toLowerCase().trim();
  }

  @BeforeInsert()
  @BeforeUpdate()
  slugifyTitle() {
    this.slug = slugify(this.title);
  }
}
