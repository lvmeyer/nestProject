export class CreatePostDto {
  id: number;
  title: string;
  body: string;
}

export class UpdatePostDto {
  title?: string;
  body?: string;
}
