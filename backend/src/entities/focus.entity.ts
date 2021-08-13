import { StoryEntity } from 'src/entities/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('focuses')
export class FocusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string;

  @OneToMany(() => StoryEntity, (story) => story.focus)
  stories: StoryEntity;
}
