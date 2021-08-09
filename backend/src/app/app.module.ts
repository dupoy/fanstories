import { ProfileModule } from './../modules/profile/profile.module';
import { UserModule } from './../modules/user/user.module';
require('dotenv').config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/orm.config';

@Module({
  imports: [ProfileModule, UserModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
