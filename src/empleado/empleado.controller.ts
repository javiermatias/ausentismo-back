import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ERole } from '../auth/role.enum';

import { Public } from 'src/auth/decorators/public.decorator';
import { EmailService } from './email.service';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('empleado')
export class EmpleadoController {
  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly emailService: EmailService,
  ) {}
  @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }
  @Public()
  //@Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Get()
  findAll() {
    return this.emailService.sendEmail(
      'javierjimenez78',
      'www.ausentismo.com',
      'hola desde send grid',
    );
    //return this.empleadoService.findAll();
  }

  @Get(':id')
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
  }
}
