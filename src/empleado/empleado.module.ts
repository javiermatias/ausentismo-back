import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Incidencia } from './entities/incidencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciaService } from './incidencia/incidencia.service';
import { User } from 'src/users/entities/user.entity';
import { UploadService } from './upload.service';
import { EmailService } from './email.service';
import { IncidenciaNoService } from './incidenciaNO/incidenciaNo.service';
import { IncidenciaNo } from './entities/incidenciaNo.entity';
import { IncidenciaNoController } from './incidenciaNO/incidenciaNo.controller';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';
import { IncidenciasController } from './incidencias/incidencias.controller';
import { IncidenciaController } from './incidencia/incidencia.controller';
import { IncidenciasService } from './incidencias/incidencias.service';
import { IncidenciasEmpleadoController } from './incidenciaEmpleado/incidencia.empleado.controller';
import { IncidenciaEmpleadoService } from './incidenciaEmpleado/incidencia.empleado.service';
import { Role } from 'src/users/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia, IncidenciaNo, User, Role, Sucursal]),
  ],
  controllers: [
    EmpleadoController,
    IncidenciaController,
    IncidenciaNoController,
    IncidenciasController,
    IncidenciasEmpleadoController,
  ],
  providers: [
    EmpleadoService,
    IncidenciaService,
    IncidenciaNoService,
    IncidenciasService,
    UploadService,
    EmailService,
    IncidenciaEmpleadoService,
  ],
})
export class EmpleadoModule {}
