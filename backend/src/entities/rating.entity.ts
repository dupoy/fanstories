import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { StoryEntity } from './story.entity';

@Entity('ratings')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string;

  @OneToMany(() => StoryEntity, (story) => story.rating)
  stories: StoryEntity[];
}
