/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateIncidenciaDto } from '../dto/create-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Incidencia } from '../entities/incidencia.entity';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';
import { Pagination } from 'src/utils/pagination';
import { IncidenciaNo } from '../entities/incidenciaNo.entity';

@Injectable()
export class IncidenciasService {
  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepositoryNo: Repository<IncidenciaNo>,
  ) {}

  async findAll(pagination: Pagination) {
    const offset = (pagination.page - 1) * pagination.limit;
    console.log(offset);
    console.log(pagination.limit);
    const rowIncidencia = await this.incidenciaRepository.count();
    const rowIncidenciaNo = await this.incidenciaRepositoryNo.count();
    const total = rowIncidencia + rowIncidenciaNo;
    const incidenciaAll = await this.incidenciaRepository.query(
      `
      SELECT
      inc.createdAt,
      u1.id AS userId,
      CONCAT(u1.firstname, ' ', u1.lastname) AS Empleado,
      'Enfermedad' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia inc
    LEFT JOIN
      user u1 ON inc.userId = u1.id
	LEFT JOIN
      sucursal s ON inc.sucursalId = s.id

    UNION ALL

    SELECT
      incNO.createdAt,
      u2.id AS userId,
      CONCAT(u2.firstname, ' ', u2.lastname) AS Empleado,
      'Otros' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia_no incNO
    LEFT JOIN
      user u2 ON incNO.userId = u2.id
	LEFT JOIN
      sucursal s ON incNO.sucursalId = s.id

    ORDER BY
      createdAt desc, userId
    
    LIMIT ${pagination.limit} OFFSET ${offset};
   `,
    );

    return {
      page: pagination.page,
      limit: pagination.limit,
      total: total,
      data: incidenciaAll,
    };
  }

  /*   findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  } */
}
