import { IsNotEmpty, IsString } from 'class-validator';

export class SucursalDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;
}
