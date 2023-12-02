/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/utils/pagination';
import { UserDto } from '../dto/auth.user.dto';
import { CreateEmpleadoDto } from '../dto/create-empleado.dto';
import { UpdateEmpleadoDto } from '../dto/update-empleado.dto';
import { ERole } from 'src/auth/role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { BuisnessException } from 'src/utils/buisness.exception';

@Injectable()
export class EncargadoService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}
  create(createEmpleadoDto: CreateEmpleadoDto) {
    const createUserDto: CreateUserDto = {
      ...createEmpleadoDto,
      rol: 'encargado', // Provide a default role or handle it based on your application logic
    };
    return this.userService.create(createUserDto);
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
      WHERE role.roleName = 'encargado'
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

  async findOne(dni: number) {
    const employee = await this.usersRepository.findOne({ where: { dni } });
    if (employee && (employee.role.roleName = ERole.Encargado)) {
      return employee;
    }
    return null;
  }

  async update(dni: number, updateEmpleadoDto: UpdateEmpleadoDto) {
    const user = await this.findOne(dni);

    if (!user) {
      throw new BuisnessException('Encargado no encontrado');
    }

    // Update user fields from the DTO
    Object.assign(user, updateEmpleadoDto);

    return this.usersRepository.save(user);
  }

  async remove(dni: number) {
    const user = await this.findOne(dni);

    if (!user) {
      throw new BuisnessException('User not found');
    }
    return this.usersRepository.delete({ dni });
  }
}
