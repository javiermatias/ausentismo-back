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
import { EmailService } from './email.service';
import { IncidenciaNoService } from './incidenciaNo.service';
import { CreateIncidenciaNoDto } from './dto/create-incidencia-no.dto';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('incidenciaNo')
export class IncidenciaNoController {
  constructor(
    private readonly incidenciaService: IncidenciaNoService,
    private readonly emailService: EmailService,
  ) {}

  @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Post()
  async create(@Body() createIncidenciaNoDto: CreateIncidenciaNoDto) {
    const incidencia = await this.incidenciaService.create(
      createIncidenciaNoDto,
    );
    console.log(incidencia);
    const email = await this.emailService.sendEmailIncidenciaNo(
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
