import { CharacterEntity } from './character.entity';
import { FandomEntity } from './fandom.entity';
import { EStoryStatus } from './../types/storyStatus.enum';
import { ERating } from './../types/raiting.enum';
import { TagEntity } from './tag.entity';
import { ChapterEntity } from './chapter.entity';
import { UserEntity } from './user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import slugify from 'slugify';
import { EFocus } from 'src/types/focus.enum';

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

  @Column({ type: 'enum', enum: EStoryStatus })
  status: EStoryStatus;

  @Column()
  favoriteCount: number;

  @Column()
  followCount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.stories, { eager: true })
  author: UserEntity;

  @OneToMany(() => ChapterEntity, (chapter) => chapter.story)
  chapters: ChapterEntity[];

  @ManyToMany(() => TagEntity, { eager: true })
  @JoinTable()
  tags: TagEntity[];

  @ManyToMany(() => UserEntity)
  @JoinTable()
  betas: UserEntity[];

  @ManyToMany(() => FandomEntity)
  @JoinTable()
  fandoms: FandomEntity[];

  @ManyToMany(() => CharacterEntity)
  @JoinTable()
  characters: CharacterEntity[];

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
