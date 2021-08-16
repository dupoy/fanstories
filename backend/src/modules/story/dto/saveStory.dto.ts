import { IsArray, IsNotEmpty } from 'class-validator';

export class SaveStoryDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
  @IsNotEmpty()
  readonly rating: string;
  @IsNotEmpty()
  readonly focus: string;
  @IsArray()
  @IsNotEmpty()
  readonly fandoms: string[];
  @IsArray()
  @IsNotEmpty()
  readonly characters: string[];
  readonly pairings: string[];
  readonly tags: string[];
  readonly betas: string[];
}
