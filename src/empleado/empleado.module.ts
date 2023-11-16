import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Incidencia } from './entities/incidencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { User } from 'src/users/entities/user.entity';
import { UploadService } from './upload.service';
import { EmailService } from './email.service';
import { IncidenciaNoService } from './incidenciaNo.service';
import { IncidenciaNo } from './entities/incidenciaNo.entity';
import { IncidenciaNoController } from './incidenciaNo.controller';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia, IncidenciaNo, User, Sucursal]),
  ],
  controllers: [
    EmpleadoController,
    IncidenciaController,
    IncidenciaNoController,
  ],
  providers: [
    EmpleadoService,
    IncidenciaService,
    IncidenciaNoService,
    UploadService,
    EmailService,
  ],
})
export class EmpleadoModule {}
