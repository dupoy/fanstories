import { StoryEntity } from './story.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import slugify from 'slugify';

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

  @ManyToOne(() => StoryEntity, (story) => story.chapters, { eager: true })
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
