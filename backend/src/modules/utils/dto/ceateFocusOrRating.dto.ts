import { IsNotEmpty } from 'class-validator';

export class CreateFucusOrRatingDto {
  @IsNotEmpty()
  readonly value: string;
  @IsNotEmpty()
  readonly description: string;
}
