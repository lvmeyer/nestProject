import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity.js';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const post = new PostEntity();
    post.title = createPostDto.title;
    post.body = createPostDto.body;

    return this.postsRepository.save(post);
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  async findOne(id: string): Promise<PostEntity> {
    console.log(id);
    return await this.postsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const post = await this.postsRepository.save({ id: id, ...updatePostDto });

    return post;
  }
}
