import slugify from 'slugify';
import {
    BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { StoryEntity } from './story.entity';

@Entity('chapters')
export class ChapterEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  slug: string

  @Column()
  title: string

  @Column()
  body: string

  @Column({default: 0})
  words: number

  @Column({default: 0})
  viewCount: number

  @ManyToOne(() => StoryEntity, (story) => story.chapters, {
    onDelete: 'CASCADE',
  })
  story: StoryEntity

  @Column({default: false})
  isPublished: boolean

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date()
  }

  @BeforeInsert()
  @BeforeUpdate()
  slugifyTitle() {
    this.slug = slugify(this.title)
  }

  @BeforeInsert()
  @BeforeUpdate()
  countWords() {
    this.words = this.body.replace(/[^a-zа-яё\s]/gi, '').split(' ').length
  }

  increaseViews() {
    this.viewCount += 1
  }
}
