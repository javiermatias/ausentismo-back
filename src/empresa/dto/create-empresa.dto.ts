import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { LocalidadDto } from './localidad.dto';

export class CreateEmpresaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;
  @IsNotEmpty()
  @IsString()
  readonly razonSocial: string;
  @IsNotEmpty()
  @IsArray()
  readonly localidades: LocalidadDto[];
}
