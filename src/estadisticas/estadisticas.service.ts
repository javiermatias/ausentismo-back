import { Injectable } from '@nestjs/common';
import { CreateEstadisticaDto } from './dto/create-estadistica.dto';
import { UpdateEstadisticaDto } from './dto/update-estadistica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { Repository } from 'typeorm';
import { IncidenciaNo } from 'src/empleado/entities/incidenciaNo.entity';

@Injectable()
export class EstadisticasService {

  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepositoryNo: Repository<IncidenciaNo>,

  ) { }
  create(createEstadisticaDto: CreateEstadisticaDto) {
    return 'This action adds a new estadistica';
  }

  async findByMonth(year:Number, empresaId:Number) {
    const incidenciaAll = await this.incidenciaRepository.query(
      `
    SELECT 
    MONTH(createdAt) AS month,
    COUNT(*) AS quantity
    FROM 
    (
        SELECT inc.createdAt FROM incidencia inc INNER JOIN sucursal s ON inc.sucursalId = s.id where s.empresaId = ${empresaId} 
        UNION ALL
        SELECT inc_no.createdAt FROM incidencia_no inc_no INNER JOIN sucursal s ON inc_no.sucursalId = s.id where s.empresaId = ${empresaId} 
    ) AS combined_tables
    WHERE 
    YEAR(createdAt) = ${year} 
    GROUP BY 
    MONTH(createdAt)
    ORDER BY month;     
    `
    );
    return incidenciaAll;
  }

  findOne(id: number) {

    return `This action returns a #${id} estadistica`;
  }

  update(id: number, updateEstadisticaDto: UpdateEstadisticaDto) {
    return `This action updates a #${id} estadistica`;
  }

  remove(id: number) {
    return `This action removes a #${id} estadistica`;
  }
}
