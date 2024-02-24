/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Incidencia } from '../entities/incidencia.entity';
import { Pagination } from 'src/utils/pagination';
import { IncidenciaNo } from '../entities/incidenciaNo.entity';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Injectable()
export class IncidenciasService {
  constructor(
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepositoryNo: Repository<IncidenciaNo>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async findAll(pagination: Pagination, empresaId:Number) {
    const offset = (pagination.page - 1) * pagination.limit;    
    const incidenciaAll = await this.incidenciaRepository.query(
      `
      SELECT
      inc.nroReferencia,
      inc.createdAt,
      u1.id AS userId,
      CONCAT(u1.nombre, ' ', u1.apellido) AS Empleado,
      'Enfermedad' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia inc
    LEFT JOIN
      user u1 ON inc.userId = u1.id
	  LEFT JOIN
      sucursal s ON inc.sucursalId = s.id
    WHERE 
      s.empresaId = ${empresaId}
    UNION ALL

    SELECT
      incNO.nroReferencia,
      incNO.createdAt,
      u2.id AS userId,
      CONCAT(u2.nombre, ' ', u2.apellido) AS Empleado,
      'Otros' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia_no incNO
    INNER JOIN
      user u2 ON incNO.userId = u2.id
	  INNER JOIN
      sucursal s ON incNO.sucursalId = s.id
    WHERE 
      s.empresaId = ${empresaId}
    ORDER BY
      createdAt desc, userId
    
    LIMIT ${pagination.limit} OFFSET ${offset};
   `,
    );
    console.log(incidenciaAll);
    const total = incidenciaAll.length;

    return {
      page: pagination.page,
      limit: pagination.limit,
      total: total,
      data: incidenciaAll,
    };
  }

  async findAllBySucursal(pagination: Pagination, sucursalId: number) {
    const offset = (pagination.page - 1) * pagination.limit;
    //console.log(offset);
    //console.log(pagination.limit);
    const rowIncidencia = await this.incidenciaRepository.count();
    const rowIncidenciaNo = await this.incidenciaRepositoryNo.count();
    const total = rowIncidencia + rowIncidenciaNo;
    const incidenciaAll = await this.incidenciaRepository.query(
      `
    SELECT
      inc.nroReferencia,
      inc.createdAt,
      u1.id AS userId,
      CONCAT(u1.nombre, ' ', u1.apellido) AS Empleado,
      'Enfermedad' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia inc
    LEFT JOIN
      user u1 ON inc.userId = u1.id
	  LEFT JOIN
      sucursal s ON inc.sucursalId = s.id
    WHERE
      inc.sucursalId = ${sucursalId}

    UNION ALL

    SELECT
      incNO.nroReferencia,
      incNO.createdAt,
      u2.id AS userId,
      CONCAT(u2.nombre, ' ', u2.apellido) AS Empleado,
      'Otros' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia_no incNO
    LEFT JOIN
      user u2 ON incNO.userId = u2.id
	  LEFT JOIN
      sucursal s ON incNO.sucursalId = s.id
    WHERE
      incNO.sucursalId = ${sucursalId}
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

  async findAllByFecha(
    pagination: Pagination,
    startDate: string,
    endDate: string,
  ) {
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
      CONCAT(u1.nombre, ' ', u1.apellido) AS Empleado,
      'Enfermedad' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia inc
    LEFT JOIN
      user u1 ON inc.userId = u1.id
	  LEFT JOIN
      sucursal s ON inc.sucursalId = s.id
    WHERE
      inc.createdAt BETWEEN '${startDate}' AND '${endDate}'

    UNION ALL

    SELECT
      incNO.nroReferencia,
      incNO.createdAt,
      u2.id AS userId,
      CONCAT(u2.nombre, ' ', u2.apellido) AS Empleado,
      'Otros' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia_no incNO
    LEFT JOIN
      user u2 ON incNO.userId = u2.id
	  LEFT JOIN
      sucursal s ON incNO.sucursalId = s.id
    WHERE
      incNO.createdAt BETWEEN '${startDate}' AND '${endDate}'
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

  async findAllByFechaBySucursal(
    pagination: Pagination,
    startDate: string,
    endDate: string,
    sucursalId: number,
  ) {
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
      CONCAT(u1.nombre, ' ', u1.apellido) AS Empleado,
      'Enfermedad' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia inc
    LEFT JOIN
      user u1 ON inc.userId = u1.id
	  LEFT JOIN
      sucursal s ON inc.sucursalId = s.id
    WHERE
      inc.createdAt BETWEEN '${startDate}' AND '${endDate}'
    AND 
    inc.sucursalId = ${sucursalId}
    UNION ALL

    SELECT
      incNO.nroReferencia,
      incNO.createdAt,
      u2.id AS userId,
      CONCAT(u2.nombre, ' ', u2.apellido) AS Empleado,
      'Otros' AS tipo,
      s.nombre AS Sucursal
    FROM
      incidencia_no incNO
    LEFT JOIN
      user u2 ON incNO.userId = u2.id
	  LEFT JOIN
      sucursal s ON incNO.sucursalId = s.id
    WHERE
      incNO.createdAt BETWEEN '${startDate}' AND '${endDate}'
    AND 
      incNO.sucursalId = ${sucursalId}
   
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

  async findSucursal(id: number) {
    return this.sucursalRepository.find({
      where: {
        id: id,
      },
    });
  }

  async findAllByEmpleado(pagination: Pagination, idUser: number) {
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
      CONCAT(u1.nombre, ' ', u1.apellido) AS Empleado,
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
      CONCAT(u2.nombre, ' ', u2.apellido) AS Empleado,
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

  /*   async findOne(id: number) {
    const Sucursal = await this.usersRepository.findOne({
      where: { username },
    });
    return user;
  } */

  /*   

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  } */
}
