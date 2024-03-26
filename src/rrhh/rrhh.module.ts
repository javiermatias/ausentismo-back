import { Module } from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { RrhhController } from './rrhh.controller';
import { ControlController } from './control/control/control.controller';
import { JustificaController } from './justifica/justifica/justifica.controller';
import { ControlService } from './control/control/control.service';
import { JustificaService } from './justifica/justifica/justifica.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { IncidenciaNo } from 'src/empleado/entities/incidenciaNo.entity';
import { ExcelController} from './empleado/excel.controller';
import { ExcelService } from './empleado/excel.service';

@Module({
  imports: [    
    TypeOrmModule.forFeature([Incidencia, IncidenciaNo]),
  ],
  controllers: [RrhhController, ControlController,JustificaController,ExcelController],
  providers: [RrhhService, ControlService, JustificaService, ExcelService],
})


export class RrhhModule {}
