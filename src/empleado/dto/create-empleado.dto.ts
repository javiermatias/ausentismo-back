import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateEmpleadoDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly firstname: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly lastname: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
