import slugify from 'slugify';
import { EFocus } from 'src/types/focus.enum';
import {
    BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { ERating } from '../types/rating.enum';
import { EStoryStatus } from '../types/storyStatus.enum';
import { ChapterEntity } from './chapter.entity';
import { FandomEntity } from './fandom.entity';
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

  @Column({ type: 'enum', enum: ERating })
  rating: ERating;

  @Column({ type: 'enum', enum: EFocus })
  focus: EFocus;

  @Column({
    type: 'enum',
    enum: EStoryStatus,
    default: EStoryStatus.IN_PROGRESS,
  })
  status: EStoryStatus;

  @Column({ default: 0 })
  favoriteCount: number;

  @Column({ default: 0 })
  followCount: number;

  @ManyToOne(() => UserEntity, (user) => user.stories, { eager: true })
  author: UserEntity;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.story)
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
}
