import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { CreateRrhhDto } from './dto/create-rrhh.dto';
import { UpdateRrhhDto } from './dto/update-rrhh.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';

@Controller('rrhh')
export class RrhhController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Roles(ERole.Admin, ERole.RRHH)
  @Post()
  create(@Body() createRrhhDto: CreateRrhhDto) {
    return this.rrhhService.create(createRrhhDto);
  }
  @Roles(ERole.Admin, ERole.RRHH)
  @Get('excel')
  findAll() {
    return this.rrhhService.findAll();
  }


}
