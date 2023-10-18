import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateIncidenciaDto {
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
  readonly enfermedad: string;
  @IsNotEmpty()
  readonly sintomas: string;
  @IsNotEmpty()
  readonly medicacion: string;
  @IsNotEmpty()
  @IsBoolean()
  readonly asistencia: boolean;
  @IsNotEmpty()
  @IsBoolean()
  readonly certificado: boolean;
  @IsNotEmpty()
  @IsNumber()
  readonly idUser: number;
  @IsOptional()
  readonly nombreImagen: string;
  @IsOptional()
  readonly nombreAws: string;
  @IsOptional()
  readonly urlImagen: string;
}

// export interface Incidencia {
//   nombre: string;
//   email: string;
//   legajo: string;
//   celular: string;
//   enfermedad: string;
//   sintomas: string;
//   medicacion: string;
//   asistencia: boolean;
//   certificado: boolean;
// }
