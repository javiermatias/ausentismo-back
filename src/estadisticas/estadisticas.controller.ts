import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { UserDto } from 'src/empleado/dto/auth.user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) { }
  
  @Roles(ERole.Admin, ERole.RRHH)
  @Get('controlvalues')
  getControlValues(@Req() req: Request) {
      // Logic for /estadisticas/controlvalues route
      const user: UserDto = req['user'];
      return this.estadisticasService.countByMonthControl("Marzo", user.empresaId);
  }

  @Roles(ERole.Admin, ERole.RRHH)
  @Get('mes/:mes')
  getByMonth(@Param('mes') month: string, @Req() req: Request) {
      // Logic for /estadisticas/controlvalues route
      const user: UserDto = req['user'];
      console.log("ingreso por mes")
      return this.estadisticasService.countByMonth(month, user.empresaId)
  }

  @Roles(ERole.Admin, ERole.RRHH)
  @Get('control/:mes')
  getByMonthControl(@Param('mes') month: string, @Req() req: Request) {
      // Logic for /estadisticas/controlvalues route
      const user: UserDto = req['user'];      
      return this.estadisticasService.countByMonthControl(month, user.empresaId);
  }

  @Roles(ERole.Admin, ERole.RRHH)
  @Get('justifica/:mes')
  getByMonthJustifica(@Param('mes') month: string, @Req() req: Request) {
      // Logic for /estadisticas/controlvalues route
      const user: UserDto = req['user'];      
      return this.estadisticasService.countByMonthJustifica(month, user.empresaId);
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
