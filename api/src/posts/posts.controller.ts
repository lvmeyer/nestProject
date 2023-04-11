import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Patch,
  ValidationPipe,
  ParseUUIDPipe,
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
    @Body(ValidationPipe) createPostDto: CreatePostDto, //@Body(ValidationPipe))
  ): Promise<{ success: boolean; message: string }> {
    await this.postsService.create(createPostDto);

    return { success: true, message: 'Created' };
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseUUIDPipe) id: string, // @Param('id', new ParseUUIDPipe())
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<{ success: boolean; message: string }> {
    await this.postsService.update(id, updatePostDto);

    return {
      success: true,
      message: 'Updated',
    };
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.postsService.remove(id);

    return {
      success: true,
      message: 'Deleted',
    };
  }
}
