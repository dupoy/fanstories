import { IsNotEmpty } from 'class-validator';

export class CreateCharacterDto {
  @IsNotEmpty()
  name: string;
}
