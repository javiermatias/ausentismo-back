import {
  Controller,
  //   Get,
  Post,
  Body,
  Get,
  Param,
  Req,
  /*   Patch,
    Param,
    Delete, */
} from '@nestjs/common';
//import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERole } from '../../auth/role.enum';
import { EmailService } from '../email.service';
import { IncidenciaNoService } from './incidenciaNo.service';
import { CreateIncidenciaNoDto } from '../dto/create-incidencia-no.dto';
import { UserDto } from '../dto/auth.user.dto';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('incidenciaNo')
export class IncidenciaNoController {
  constructor(
    private readonly incidenciaNoService: IncidenciaNoService,
    private readonly emailService: EmailService,
  ) {}

  @Roles(ERole.Empleado, ERole.Encargado, ERole.Admin)
  @Post()
  async create(
    @Body() createIncidenciaNoDto: CreateIncidenciaNoDto,
    @Req() req: Request,
  ) {
    const user: UserDto = req['user'];
    const incidencia = await this.incidenciaNoService.create(
      createIncidenciaNoDto,
    );
    const RRHH = await this.emailService.searchRRHH(user.empresaId);

    for (const user of RRHH) {
      const email = await this.emailService.sendEmailIncidenciaNo(
        user.email,
        incidencia,
      );
      console.log(email);
    }
    return {
      value: incidencia.nroReferencia,
      message: 'Incidencia fue creada exitosamente',
    };
  }

  @Get(':id')
  findOne(@Param('id') nro_referencia: string) {
    return this.incidenciaNoService.findOne(+nro_referencia);
  }

  /*   @Roles(ERole.Empleado, ERole.Encargado, ERole.Admin)
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
