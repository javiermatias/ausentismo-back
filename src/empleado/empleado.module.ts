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

@Module({
  imports: [TypeOrmModule.forFeature([Incidencia, User])],
  controllers: [EmpleadoController, IncidenciaController],
  providers: [EmpleadoService, IncidenciaService, UploadService, EmailService],
})
export class EmpleadoModule {}
