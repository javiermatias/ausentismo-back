import { Controller, Get, Param, Query } from '@nestjs/common';
//import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERole } from '../../auth/role.enum';
import { IncidenciasService } from './incidencias.service';
import { Pagination } from 'src/utils/pagination';
import { SucursalService } from 'src/sucursal/sucursal.service';
import { BuisnessException } from 'src/utils/buisness.exception';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('incidencias')
export class IncidenciasController {
  constructor(
    private readonly incidenciasService: IncidenciasService,
    private readonly sucursalService: SucursalService,
  ) {}

  @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Get()
  findAll(@Query() pagination: Pagination) {
    return this.incidenciasService.findAll(pagination);
  }
  @Get(':id')
  async findOne(@Param('id') id: number, @Query() pagination: Pagination) {
    if (!(await this.sucursalService.findOne(id))) {
      throw new BuisnessException('No Existe la Sucursal');
    }
    return this.incidenciasService.findAllBySucursal(pagination, id);
  }

  @Get('fecha/fecha')
  findByFecha(
    @Query() pagination: Pagination,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.incidenciasService.findAllByFecha(
      pagination,
      startDate,
      endDate,
    );
  }
  @Get('fecha/sucursal/:id')
  findByFechaAndSucursal(
    @Param('id') id: number,
    @Query() pagination: Pagination,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.incidenciasService.findAllByFecha(
      pagination,
      startDate,
      endDate,
    );
  }

  /*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(+id);
  } */
}
