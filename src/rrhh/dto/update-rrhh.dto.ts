import { PartialType } from '@nestjs/mapped-types';
import { CreateRrhhDto } from './create-rrhh.dto';

export class UpdateRrhhDto extends PartialType(CreateRrhhDto) {}
