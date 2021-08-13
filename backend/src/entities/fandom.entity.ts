import slugify from 'slugify';
import {
    BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

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

  @OneToMany(() => CharacterEntity, (character) => character.fandom, {
    eager: true,
    onDelete: 'CASCADE',
  })
  characters: CharacterEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  slugifyTitle() {
    this.slug = slugify(this.title);
  }
}
