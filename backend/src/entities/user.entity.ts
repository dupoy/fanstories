import { hash } from 'bcrypt';
import {
    BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { StoryEntity } from './story.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: '' })
  bio: string;

  @Column()
  image: string;

  @OneToMany(() => StoryEntity, (story) => story.author)
  stories: StoryEntity[];

  @ManyToMany(() => UserEntity, { cascade: true })
  @JoinTable()
  followAuthors: UserEntity[];

  @ManyToMany(() => StoryEntity, { cascade: true })
  @JoinTable()
  followStories: StoryEntity[];

  @ManyToMany(() => StoryEntity, { cascade: true })
  @JoinTable()
  favoriteStories: StoryEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  defaultImage() {
    if (!this.image) {
      this.image = `https://dummyimage.com/300/ffffff/000000&text=${this.username}`;
    }
  }
}
