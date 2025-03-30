import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PostsModule, HttpModule],
})
export class AppModule {} 