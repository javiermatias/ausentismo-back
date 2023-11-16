import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateIncidenciaNoDto {
  @IsNotEmpty()
  readonly nombre: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  readonly legajo: string;
  @IsNotEmpty()
  readonly celular: string;
  @IsNotEmpty()
  readonly direccion: string;
  @IsNotEmpty()
  readonly motivo: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly certificado: boolean;
  @IsNotEmpty()
  @IsNumber()
  readonly idUser: number;
  @IsNotEmpty()
  @IsNumber()
  readonly idSucursal: number;
  @IsOptional()
  readonly nombreImagen: string;
  @IsOptional()
  readonly nombreAws: string;
  @IsOptional()
  readonly urlImagen: string;
}
