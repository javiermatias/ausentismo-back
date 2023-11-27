/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/auth.user.dto';
import { Pagination } from 'src/utils/pagination';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}
  create(createEmpleadoDto: CreateEmpleadoDto) {
    return 'This action adds a new empleado';
  }

  async findAll(pagination: Pagination, user: UserDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    const rowCount = await this.usersRepository.count();

    const users = await this.dataSource
      .createQueryBuilder(User, 'user')
      .select([
        'user.id as id',
        'user.dni as dni',
        'user.firstname as nombre',
        'user.lastname as apellido',
        'user.email as email',
      ])
      .innerJoin('user.role', 'role') // Join the 'role' relationship
      .innerJoin('user.empresa', 'empresa') // Join the 'empresa' relationship
      .where('role.roleName = :roleName', { roleName: 'empleado' })
      .andWhere('empresa.id = :empresaId', { empresaId: user.empresaId }) // Replace 1079 with the desired empresa ID
      .andWhere(
        'user.firstname LIKE :nombre OR user.lastname LIKE :nombre OR user.dni LIKE :nombre',
        {
          nombre: `%${pagination.search}%`,
        },
      )
      .offset(skip)
      .limit(pagination.limit)
      .getRawMany<Empleado>();

    //console.log(users);

    /* const items = await this.dataSource
      .createQueryBuilder(User, 'user')
      // .select(['user.dni', 'user.firstname', 'user.lastname', 'user.email'])
      .getMany(); */

    /*   const [items, total] = await this.usersRepository.findAndCount({
      skip,
      take: limit,
    }); */

    return {
      page: pagination.page,
      limit: pagination.limit,
      total: rowCount,
      data: users,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} empleado`;
  }

  update(id: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    return `This action updates a #${id} empleado`;
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }
}
