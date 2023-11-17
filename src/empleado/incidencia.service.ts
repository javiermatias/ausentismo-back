/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
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
}
