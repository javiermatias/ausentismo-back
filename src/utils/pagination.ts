import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class Pagination {
  @IsInt()
  @IsNotEmpty()
  page: number = 1;
  @IsInt()
  @IsNotEmpty()
  limit: number = 500;
  @IsString()
  search: string = '';
}
