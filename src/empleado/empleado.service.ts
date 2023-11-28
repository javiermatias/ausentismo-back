/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/auth.user.dto';
import { Pagination } from 'src/utils/pagination';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}
  create(createEmpleadoDto: CreateEmpleadoDto) {
    const createUserDto: CreateUserDto = {
      ...createEmpleadoDto,
      rol: 'empleado', // Provide a default role or handle it based on your application logic
    };
    return this.userService.create(createUserDto);
  }

  async findAll(pagination: Pagination, user: UserDto) {
    const skip = (pagination.page - 1) * pagination.limit;
    const rowCount = await this.usersRepository.count();
    console.log(user.empresaId);
    const users = await this.usersRepository.query(
      `
      SELECT user.id as id, 
      user.dni as dni, 
      user.firstname as nombre, 
      user.lastname as apellido, 
      user.email as email
      FROM user
      INNER JOIN role ON user.roleId = role.id
      INNER JOIN empresa ON user.empresaId= empresa.id
      WHERE role.roleName = 'empleado'
      AND empresa.id = ${user.empresaId}
      AND (user.firstname LIKE '%${pagination.search}%' OR user.lastname LIKE '%${pagination.search}%' OR user.dni LIKE '%${pagination.search}%')
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

/* async findAll(pagination: Pagination, user: UserDto) {
  const skip = (pagination.page - 1) * pagination.limit;
  const rowCount = await this.usersRepository.count();
  console.log(user.empresaId);
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

  return {
    page: pagination.page,
    limit: pagination.limit,
    total: rowCount,
    data: users,
  };
} */
