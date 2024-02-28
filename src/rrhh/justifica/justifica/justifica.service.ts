import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { IncidenciaNo } from 'src/empleado/entities/incidenciaNo.entity';
import { UpdateJustificaDto } from 'src/rrhh/dto/update-justifica.dto';
import { Repository } from 'typeorm';

@Injectable()
export class JustificaService {

    constructor(
        @InjectRepository(Incidencia)
        private incidenciaRepository: Repository<Incidencia>,
        @InjectRepository(IncidenciaNo)
        private incidenciaRepositoryNo: Repository<IncidenciaNo>
      ) { }
      async update(updateJustificaDto: UpdateJustificaDto) {
        const { nroReferencia, nombre } = updateJustificaDto;
        console.log("nro:" + nroReferencia);
        // Try to find Incidencia entity by nroReferencia in the first repository
        let incidencia = await this.incidenciaRepository.findOne({ where: { nroReferencia } });
        let incidencia_no: IncidenciaNo;
        //console.log("incidenciA: " + incidencia);
        // If Incidencia entity is not found, try finding it in the second repository
        if (!incidencia) {
          incidencia_no = await this.incidenciaRepositoryNo.findOne({ where: { nroReferencia } });
          // If Incidencia entity is still not found, throw NotFoundException
          if (!incidencia_no) {
            throw new NotFoundException(`Incidencia with reference number ${nroReferencia} not found`);
          }
        }
        // Update the control field of the found Incidencia entity
        if (incidencia) {
          incidencia.justificado = nombre;
          await this.incidenciaRepository.save(incidencia);
        } else {
          incidencia_no.justificado = nombre;
          await this.incidenciaRepositoryNo.save(incidencia);
        }
    
        return 'Update correctly';
        // Save the updated entity
    
      }
    
    





}
