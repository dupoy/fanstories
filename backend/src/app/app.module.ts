require('dotenv').config();
import { StoryModule } from './../modules/story/story.module';
import { ChapterModule } from './../modules/chapter/chapter.module';
import { CharacterModule } from './../modules/character/character.module';
import { FandomModule } from './../modules/fandom/fandom.module';
import { ProfileModule } from './../modules/profile/profile.module';
import { UserModule } from './../modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/orm.config';

@Module({
  imports: [
    StoryModule,
    ChapterModule,
    CharacterModule,
    FandomModule,
    ProfileModule,
    UserModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
