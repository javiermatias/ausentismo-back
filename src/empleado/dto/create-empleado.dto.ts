import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateEmpleadoDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly firstname: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly lastname: string;
  @IsNotEmpty()
  @IsInt()
  readonly dni: number;
  @IsOptional()
  @IsEmail()
  readonly email: string;
}
