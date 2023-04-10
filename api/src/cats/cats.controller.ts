import {
  Controller,
  Header,
  Get,
  HttpCode,
  Post,
  Req,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/cats.dto.js';
import { CatsService } from './cats.service.js';
import { Cat } from './cat.entity.js';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@Req() request: Request): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Cat> {
    console.log(params.id);
    return this.catsService.findOne(params.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(id);
  }
}
