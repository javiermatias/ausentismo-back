/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // Import bcrypt
import { Role } from './entities/role.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.dni.toString(), 10);
    const role = await this.roleRepository.findOne({
      where: { roleName: createUserDto.rol },
    });

    const user = {
      ...createUserDto, // Copy fields from sourceObject
      username: createUserDto.dni.toString(),
      password: hashedPassword,
      role: role || null,
    };

    /*   this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([...user]); */
    return this.usersRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByUser(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
