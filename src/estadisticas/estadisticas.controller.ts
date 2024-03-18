import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { UserDto } from 'src/empleado/dto/auth.user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) { }
  
  @Roles(ERole.Admin, ERole.RRHH)
  @Get('controlvalues')
  getControlValues() {
      // Logic for /estadisticas/controlvalues route
      return 'GET request to /estadisticas/controlvalues';
  }
  ///Contadores globales
  @Roles(ERole.Admin, ERole.RRHH)
  @Get()
  findAll(@Req() req: Request) {
    const user: UserDto = req['user'];
    return this.estadisticasService.combineResults(user.empresaId);
  }

  ///Contador por mes y por año
  @Roles(ERole.Admin, ERole.RRHH)
  @Get(':year')
  findOne(@Param('year') year: number, @Req() req: Request) {
    const user: UserDto = req['user'];
    return this.estadisticasService.findByMonth(year, user.empresaId);
  }

  



}
