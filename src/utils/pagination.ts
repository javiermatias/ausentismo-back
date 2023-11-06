import { IsInt, IsNotEmpty } from 'class-validator';

export class Pagination {
  @IsInt()
  @IsNotEmpty()
  page: number = 1;

  @IsInt()
  @IsNotEmpty()
  limit: number = 500;
}
