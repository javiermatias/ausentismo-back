import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { SucursalDto } from './sucursal.dto';

export class LocalidadDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;
  @IsNotEmpty()
  @IsArray()
  readonly sucursales: SucursalDto[];
}
