/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Import bcrypt
import { Role } from './entities/role.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { BuisnessException } from 'src/utils/buisness.exception';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const DNI = await this.findByDni(createUserDto.dni);
    console.log(DNI);
    if ((await this.findByDni(createUserDto.dni)) != null) {
      throw new BuisnessException('Ya existe ese DNI');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.dni.toString(), 10);
    const role = await this.roleRepository.findOne({
      where: { roleName: createUserDto.rol },
    });
    const empresa = await this.empresaRepository.findOne({
      where: { id: createUserDto.empresaId },
    });

    const user = {
      ...createUserDto, // Copy fields from sourceObject
      username: createUserDto.dni.toString(),
      password: hashedPassword,
      role,
      empresa,
    };
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findByUser(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    return user;
  }
  async findByDni(dni: number) {
    const user = await this.usersRepository.findOne({
      where: { dni },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Update user entity with values from updateUserDto
    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
