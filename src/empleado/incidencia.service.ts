/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Incidencia } from './entities/incidencia.entity';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Incidencia)
    private incidenciaRepository: Repository<Incidencia>,
  ) {}
  async create(createIncidenciaDto: CreateIncidenciaDto) {
    const user = await this.usersRepository.findOne({
      where: { id: createIncidenciaDto.idUser },
    });
    // console.log(role);

    const incidencia = {
      ...createIncidenciaDto, // Copy fields from sourceObject
      user: user,
    };

    /*   this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([...user]); */
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
