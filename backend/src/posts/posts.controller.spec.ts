import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './interfaces/post.interface';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  const mockPostsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Post',
        body: 'Test Body',
        userId: 1
      };
      const expectedResult: Post = {
        id: 1,
        title: 'Test Post',
        body: 'Test Body',
        userId: 1
      };
      
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      
      const result = await controller.create(createPostDto);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createPostDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const expectedResult: Post[] = [
        { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
        { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
      ];
      
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      
      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single post', async () => {
      const expectedResult: Post = { 
        id: 1, 
        title: 'Post 1', 
        body: 'Body 1',
        userId: 1
      };
      
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      
      const result = await controller.findOne('1');
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const updatePostDto: UpdatePostDto = {
        title: 'Updated Post',
        body: 'Updated Body',
        userId: 1
      };
      const expectedResult: Post = {
        id: 1,
        title: 'Updated Post',
        body: 'Updated Body',
        userId: 1
      };
      
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      
      const result = await controller.update('1', updatePostDto);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, updatePostDto);
    });
  });

  describe('remove', () => {
    it('should delete a post', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      
      const result = await controller.remove('1');
      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
}); 