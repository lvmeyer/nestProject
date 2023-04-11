import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { PostEntity } from './post.entity.js';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<InsertResult> {
    return this.postsRepository.insert(createPostDto); // use insert (=> save + flush)
  }

  async findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  async findOne(id: string): Promise<PostEntity> {
    console.log(id);
    return await this.postsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postsRepository.delete(id);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<void> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.postsRepository.update(id, updatePostDto);
  }
}
