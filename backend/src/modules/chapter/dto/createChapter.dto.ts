import { IsNotEmpty } from 'class-validator';

export class CreateChapterDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly body: string;
}
