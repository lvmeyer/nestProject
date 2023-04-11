import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { CreatePostDto, UpdatePostDto } from './dto/posts.dto.js';
import { PostEntity } from './post.entity.js';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ success: boolean; message: PostEntity }> {
    if (
      !createPostDto.title ||
      !createPostDto.body ||
      typeof createPostDto.title !== 'string' ||
      typeof createPostDto.body !== 'string' ||
      createPostDto.title.length > 50
    ) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const post = await this.postsService.create(createPostDto);

    return { success: true, message: post };
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const isRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!isRegex.test(id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    try {
      const post = await this.postsService.update(id, updatePostDto);
      if (!post) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (e) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    const isRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!isRegex.test(id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    try {
      const post = await this.postsService.findOne(id);
      if (!post) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return post;
    } catch (e) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const isRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!isRegex.test(id)) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.postsService.remove(id);
    } catch (e) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
