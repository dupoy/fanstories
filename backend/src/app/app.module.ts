require('dotenv').config();

import { AuthMiddleware } from 'src/modules/user/middlewares/auth.middleware';
import config from 'src/orm.config';

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChapterModule } from '../modules/chapter/chapter.module';
import { CharacterModule } from '../modules/character/character.module';
import { FandomModule } from '../modules/fandom/fandom.module';
import { ProfileModule } from '../modules/profile/profile.module';
import { StoryModule } from '../modules/story/story.module';
import { TagModule } from '../modules/tag/tag.module';
import { UserModule } from '../modules/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TagModule,
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
