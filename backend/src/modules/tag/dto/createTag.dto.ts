import { IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
}
