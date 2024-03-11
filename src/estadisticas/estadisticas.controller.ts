import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { UserDto } from 'src/empleado/dto/auth.user.dto';

@Controller('estadisticas')
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  @Post()
  create(@Body() createEstadisticaDto: CreateEstadisticaDto) {
    return this.estadisticasService.create(createEstadisticaDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return "Hola"
  }

  @Get(':year')
  findOne(@Param('year') year: number, @Req() req: Request) {
    const user: UserDto = req['user'];
    return this.estadisticasService.findByMonth(year, user.empresaId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadisticaDto: UpdateEstadisticaDto) {
    return this.estadisticasService.update(+id, updateEstadisticaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadisticasService.remove(+id);
  }
}
