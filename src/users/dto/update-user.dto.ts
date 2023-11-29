import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly nombre?: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.toUpperCase())
  readonly apellido?: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email?: string;
}
