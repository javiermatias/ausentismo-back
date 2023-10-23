import {
  Controller,
  //   Get,
  Post,
  Body,
  /*   Patch,
  Param,
  Delete, */
} from '@nestjs/common';
//import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ERole } from '../auth/role.enum';
import { IncidenciaService } from './incidencia.service';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { EmailService } from './email.service';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('incidencia')
export class IncidenciaController {
  constructor(
    private readonly incidenciaService: IncidenciaService,
    private readonly emailService: EmailService,
  ) {}

  @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Post()
  async create(@Body() createIncidenciaDto: CreateIncidenciaDto) {
    const incidencia = await this.incidenciaService.create(createIncidenciaDto);
    console.log(incidencia);
    const email = await this.emailService.sendEmailIncidencia(
      'javierjimenez78@gmail.com',
      incidencia,
    );
    console.log(email);
    return {
      value: incidencia.id,
      message: 'Incidencia fue creada exitosamente',
    };
  }

  /*   @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Get()
  findAll() {
    return this.empleadoService.findAll();
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
  } */
}
