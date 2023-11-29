import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ERole } from '../../auth/role.enum';

const roles = Object.values(ERole);

export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly nombre: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly apellido: string;
  @IsOptional()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsInt()
  readonly dni: number;
  @IsIn(roles)
  readonly rol: string;
  @IsInt()
  readonly empresaId: number;
}
