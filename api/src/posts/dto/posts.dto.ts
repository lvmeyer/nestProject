import { IsOptional, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(3, 50)
  title: string;

  @IsString()
  @Length(3, 50)
  body: string;
}

export class UpdatePostDto {
  @IsString()
  @Length(3, 50)
  @IsOptional()
  title?: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  body?: string;
}

// class validator / pipe
