import slugify from 'slugify';
import {
    BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { StoryStatuses } from '../types/storyStatus.enum';
import { ChapterEntity } from './chapter.entity';
import { FandomEntity } from './fandom.entity';
import { FocusEntity } from './focus.entity';
import { RatingEntity } from './rating.entity';
import { TagEntity } from './tag.entity';
import { UserEntity } from './user.entity';

@Entity('stories')
export class StoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  words: number;

  @Column({ default: 0 })
  pages: number;

  @ManyToOne(() => RatingEntity, (rating) => rating.stories, { eager: true })
  rating: RatingEntity;

  @ManyToOne(() => FocusEntity, (focus) => focus.stories, { eager: true })
  focus: FocusEntity;

  @Column({
    type: 'enum',
    enum: StoryStatuses,
    default: StoryStatuses.IN_PROGRESS,
  })
  status: StoryStatuses;

  @Column({ default: 0 })
  favoriteCount: number;

  @Column({ default: 0 })
  followCount: number;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => UserEntity, (user) => user.stories, { eager: true })
  author: UserEntity;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.story, {
    onDelete: 'CASCADE',
    eager: true,
  })
  chapters: ChapterEntity[];

  @ManyToMany(() => FandomEntity)
  @JoinTable()
  fandoms: FandomEntity[];

  @Column({ type: 'simple-array' })
  characters: string[];

  @Column({ type: 'simple-array' })
  pairings: string[];

  @ManyToMany(() => TagEntity, { eager: true })
  @JoinTable()
  tags: TagEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  betas: UserEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  slugifyTitle() {
    this.slug = slugify(this.title);
  }

  countWords(): number {
    if (this.chapters) {
      this.words = this.chapters.reduce((acc, prev: ChapterEntity) => {
        return (acc += prev.words);
      }, 0);
    }

    return this.words;
  }

  countViews() {
    this.chapters.forEach((chapter) => (this.viewCount += chapter.viewCount));
  }
}
