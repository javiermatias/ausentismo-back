import { Controller, Get, Query, Req } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERole } from '../../auth/role.enum';
import { Pagination } from 'src/utils/pagination';
import { IncidenciaEmpleadoService } from './incidencia.empleado.service';
import { UserDto } from '../dto/auth.user.dto';

@Controller('incidencias-empleado')
export class IncidenciasEmpleadoController {
  constructor(
    private readonly incidenciasEmplService: IncidenciaEmpleadoService,
  ) {}

  @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Get()
  findAll(@Query() pagination: Pagination, @Req() req: Request) {
    const user: UserDto = req['user'];
    //console.log(user);
    return this.incidenciasEmplService.findAll(pagination, user.id);
  }

  /* @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Get(':id')
  async findOne(@Param('id') id: number, @Query() pagination: Pagination) {
    return this.incidenciasEmplService.findByEmpleado
  } */
}
