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
import { SucursalService } from 'src/sucursal/sucursal.service';
import { SucursalModule } from 'src/sucursal/sucursal.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia, IncidenciaNo, User, Sucursal]),
    SucursalModule,
  ],
  controllers: [
    EmpleadoController,
    IncidenciaController,
    IncidenciaNoController,
    IncidenciasController,
  ],
  providers: [
    EmpleadoService,
    IncidenciaService,
    IncidenciaNoService,
    IncidenciasService,
    UploadService,
    EmailService,
    SucursalService,
  ],
})
export class EmpleadoModule {}
