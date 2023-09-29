import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsInt, IsNotEmpty } from 'class-validator';
import { ERole } from 'src/auth/role.enum';

const roles = Object.values(ERole);

export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly firstname: string;
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly lastname: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsInt()
  readonly dni: number;
  @IsIn(roles)
  readonly rol: string;
}
