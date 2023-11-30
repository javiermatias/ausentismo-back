/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';
import { UserDto } from '../dto/auth.user.dto';
import { CreateEmpleadoDto } from '../dto/create-empleado.dto';
import { UpdateEmpleadoDto } from '../dto/update-empleado.dto';
import { ERole } from 'src/auth/role.enum';

@Injectable()
export class EncargadoService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createEmpleadoDto: CreateEmpleadoDto) {
    return 'This action adds a new empleado';
  }

  async findAll(pagination: Pagination, user: UserDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    const rowCount = await this.usersRepository.count();
    const users = await this.usersRepository.query(
      `
      SELECT user.id as id, 
      user.dni as dni, 
      user.nombre as nombre, 
      user.apellido as apellido, 
      user.email as email
      FROM user
      INNER JOIN role ON user.roleId = role.id
      INNER JOIN empresa ON user.empresaId= empresa.id
      WHERE role.roleName = ${ERole.Encargado}
      AND empresa.id = ${user.empresaId}
      AND (user.nombre LIKE '%${pagination.search}%' OR user.apellido LIKE '%${pagination.search}%' OR user.dni LIKE '%${pagination.search}%')
      LIMIT ${pagination.limit} OFFSET ${skip};
    
   `,
    );

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
    return this.usersRepository.delete(id);
  }
}
