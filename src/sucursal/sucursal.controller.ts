import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Controller('sucursal')
export class SucursalController {
  constructor(private readonly sucursalService: SucursalService) {}

  @Post()
  create(@Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalService.create(createSucursalDto);
  }

  @Get(':localidadId')
  async findAll(
    @Param('localidadId') localidadId: number,
  ): Promise<Sucursal[]> {
    return this.sucursalService.findAll(localidadId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sucursalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSucursalDto: UpdateSucursalDto,
  ) {
    return this.sucursalService.update(+id, updateSucursalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sucursalService.remove(+id);
  }
}
