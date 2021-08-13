export class SaveStoryDto {
  readonly title: string;
  readonly description: string;
  readonly rating: string;
  readonly focus: string;
  readonly fandoms: string[];
  readonly characters: string[];
  readonly pairings: string[];
  readonly tags: string[];
  readonly betas: string[];
}
