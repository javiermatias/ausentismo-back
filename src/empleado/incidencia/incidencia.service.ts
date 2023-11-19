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
export class IncidenciaService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepositoryNo: Repository<IncidenciaNo>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}
  async create(createIncidenciaDto: CreateIncidenciaDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createIncidenciaDto.idUser },
    });
    const sucursal = await this.sucursalRepository.findOne({
      where: { id: createIncidenciaDto.idSucursal },
    });

    const incidencia = {
      ...createIncidenciaDto, // Copy fields from sourceObject
      user: user,
      sucursal: sucursal,
    };

    return this.incidenciaRepository.save(incidencia);
    //return createIncidenciaDto;
  }

  /*   findAll() {
    return `This action returns all empleado`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  } */

  async findAllCombine(pagination: Pagination) {
    const offset = (pagination.page - 1) * pagination.limit;
    const rowIncidencia = await this.incidenciaRepository.count();
    const rowIncidenciaNo = await this.incidenciaRepositoryNo.count();
    const total = rowIncidencia + rowIncidenciaNo;
    const incidenciaAll = this.incidenciaRepository.query(
      `
    SELECT 
      inc.createdAt,
      u1.id AS userId,
      CONCAT(u1.nombre, ' ', u1.apellido) AS Empleado,
      'Enfermedad' AS tipo,
      inc.Enfermedad AS otros
    FROM 
      Incidencia inc
    LEFT JOIN 
      User u1 ON inc.userId = u1.id

    UNION ALL

    SELECT 
      incNO.createdAt,
      u2.id AS userId,
      CONCAT(u2.nombre, ' ', u2.apellido) AS Empleado,
      'Otros' AS tipo,
      incNO.Otros AS otros
    FROM 
      IncidenciaNO incNO
    LEFT JOIN 
      User u2 ON incNO.userId = u2.id

    ORDER BY
      createdAt, userId
    OFFSET ${offset}
    LIMIT ${pagination.limit}
  `,
    );
  }
}
