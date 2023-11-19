/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateIncidenciaDto } from '../dto/create-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IncidenciaNo } from '../entities/incidenciaNo.entity';
import { CreateIncidenciaNoDto } from '../dto/create-incidencia-no.dto';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Injectable()
export class IncidenciaNoService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(IncidenciaNo)
    private incidenciaNoRepository: Repository<IncidenciaNo>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}
  async create(createIncidenciaNoDto: CreateIncidenciaNoDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createIncidenciaNoDto.idUser },
    });
    const sucursal = await this.sucursalRepository.findOne({
      where: { id: createIncidenciaNoDto.idSucursal },
    });

    const incidencia = {
      ...createIncidenciaNoDto, // Copy fields from sourceObject
      user: user,
      sucursal: sucursal,
    };

    return this.incidenciaNoRepository.save(incidencia);
    //return createIncidenciaDto;
  }
}
