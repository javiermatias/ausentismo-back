import {
  Controller,
  //   Get,
  Post,
  Body,
  Get,
  Req,
  Param,
  /*   Patch,
  Param,
  Delete, */
} from '@nestjs/common';
//import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ERole } from '../../auth/role.enum';
import { IncidenciaService } from './incidencia.service';
import { CreateIncidenciaDto } from '../dto/create-incidencia.dto';
import { EmailService } from '../email.service';
import { UserDto } from '../dto/auth.user.dto';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('incidencia')
export class IncidenciaController {
  constructor(
    private readonly incidenciaService: IncidenciaService,
    private readonly emailService: EmailService,
  ) {}

  @Roles(ERole.Empleado, ERole.Encargado, ERole.Admin)
  @Post()
  async create(
    @Body() createIncidenciaDto: CreateIncidenciaDto,
    @Req() req: Request,
  ) {
    const user: UserDto = req['user'];
    const incidencia = await this.incidenciaService.create(createIncidenciaDto);
    const RRHH = await this.emailService.searchRRHH(user.empresaId);
    for (const user of RRHH) {
      const email = await this.emailService.sendEmailIncidencia(
        user.email,
        incidencia,
      );
      console.log(email);
    }

    //console.log(email);
    return {
      value: incidencia.nroReferencia,
      message: 'Incidencia fue creada exitosamente',
    };
  }

  @Get()
  findAll() {
    return this.incidenciaService.getMaxReferenceNumber();
  }

  @Get(':id')
  findOne(@Param('id') nro_referencia: string) {
    console.log(nro_referencia);
    return this.incidenciaService.findOne(+nro_referencia);
  }

  /*   @Roles(ERole.Empleado, ERole.Encargado
    , ERole.Admin)
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
