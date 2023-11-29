import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateEmpleadoDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly nombre: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly apellido: string;
  @IsNotEmpty()
  @IsInt()
  readonly dni: number;
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsOptional()
  @IsInt()
  empresaId: number;
}
