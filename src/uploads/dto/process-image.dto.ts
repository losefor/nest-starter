import { Type } from 'class-transformer';

export class ProcessImageDto {
  image: string;

  @Type(() => Number)
  q: number;

  @Type(() => Number)
  w: number;
}
