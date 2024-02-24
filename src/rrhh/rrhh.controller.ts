import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { CreateRrhhDto } from './dto/create-rrhh.dto';
import { UpdateRrhhDto } from './dto/update-rrhh.dto';

@Controller('rrhh')
export class RrhhController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Post()
  create(@Body() createRrhhDto: CreateRrhhDto) {
    return this.rrhhService.create(createRrhhDto);
  }

  @Get()
  findAll() {
    return this.rrhhService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rrhhService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRrhhDto: UpdateRrhhDto) {
    return this.rrhhService.update(+id, updateRrhhDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rrhhService.remove(+id);
  }
}
