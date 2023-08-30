import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CommonQueries {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip?: 0;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take?: 25;

  sortingKey?: string;
  sortingDirection?: string;
  query?: string;
}
