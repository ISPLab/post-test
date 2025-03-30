import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Post } from './interfaces/post.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PostsService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private httpService: HttpService) {}

  async findAll(): Promise<Post[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Post[]>(this.apiUrl)
    );
    return data;
  }

  async findOne(id: number): Promise<Post> {
    const { data } = await firstValueFrom(
      this.httpService.get<Post>(`${this.apiUrl}/${id}`)
    );
    return data;
  }

  async create(post: Omit<Post, 'id'>): Promise<Post> {
    const { data } = await firstValueFrom(
      this.httpService.post<Post>(this.apiUrl, post)
    );
    return data;
  }

  async update(id: number, post: Partial<Post>): Promise<Post> {
    const { data } = await firstValueFrom(
      this.httpService.put<Post>(`${this.apiUrl}/${id}`, post)
    );
    return data;
  }

  async remove(id: number): Promise<void> {
    await firstValueFrom(
      this.httpService.delete(`${this.apiUrl}/${id}`)
    );
  }
} 