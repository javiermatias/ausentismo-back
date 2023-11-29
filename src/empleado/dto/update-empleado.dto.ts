import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateEmpleadoDto } from './create-empleado.dto';

// Exclude the 'dni' field from CreateEmpleadoDto
export class UpdateEmpleadoDto extends PartialType(
  OmitType(CreateEmpleadoDto, ['dni']), // Exclude 'dni' field
) {}
