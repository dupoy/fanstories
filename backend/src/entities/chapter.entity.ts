import slugify from 'slugify';
import {
    BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { StoryEntity } from './story.entity';

@Entity('chapters')
export class ChapterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  words: number;

  @ManyToOne(() => StoryEntity, (story) => story.chapters)
  story: StoryEntity;

  @BeforeInsert()
  @BeforeUpdate()
  slugifyTitle() {
    this.slug = slugify(this.title);
  }

  @BeforeInsert()
  @BeforeUpdate()
  countWords() {
    this.story.words -= this.words;
    this.words = this.body.replace(/[^a-zа-яё\s]/gi, '').split(' ').length;
    this.story.words += this.words;
  }
}
