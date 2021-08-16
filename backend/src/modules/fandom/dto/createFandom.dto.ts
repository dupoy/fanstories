import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateFandomDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  @IsArray()
  @IsNotEmpty()
  readonly characters: string[];
}
