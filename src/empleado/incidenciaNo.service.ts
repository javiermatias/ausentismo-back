/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { IncidenciaNo } from './entities/incidenciaNo.entity';
import { CreateIncidenciaNoDto } from './dto/create-incidencia-no.dto';

@Injectable()
export class IncidenciaNoService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(IncidenciaNo)
    private incidenciaRepository: Repository<IncidenciaNo>,
  ) {}
  async create(createIncidenciaNoDto: CreateIncidenciaNoDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createIncidenciaNoDto.idUser },
    });

    const incidencia = {
      ...createIncidenciaNoDto, // Copy fields from sourceObject
      user: user,
    };

    return this.incidenciaRepository.save(incidencia);
    //return createIncidenciaDto;
  }
}
