/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from '../entities/incidencia.entity';
import { Pagination } from 'src/utils/pagination';
import { IncidenciaNo } from '../entities/incidenciaNo.entity';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Injectable()
export class IncidenciaEmpleadoService {
  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepositoryNo: Repository<IncidenciaNo>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async findByEmpleado(id: number) {
    return this.sucursalRepository.find({
      where: {
        id: id,
      },
    });
  }

  async findAll(pagination: Pagination, idUser: number) {
    const offset = (pagination.page - 1) * pagination.limit;
    const rowIncidencia = await this.incidenciaRepository.count();
    const rowIncidenciaNo = await this.incidenciaRepositoryNo.count();
    const total = rowIncidencia + rowIncidenciaNo;
    const incidenciaAll = await this.incidenciaRepository.query(
      `
      SELECT
      inc.nroReferencia,
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
    WHERE
      inc.userId = ${idUser}

    UNION ALL

    SELECT
      incNO.nroReferencia,
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
    WHERE
      incNO.userId = ${idUser}
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
}
