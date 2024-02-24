import { Injectable } from '@nestjs/common';
import { CreateRrhhDto } from './dto/create-rrhh.dto';
import { UpdateRrhhDto } from './dto/update-rrhh.dto';

@Injectable()
export class RrhhService {
  create(createRrhhDto: CreateRrhhDto) {
    return 'This action adds a new rrhh';
  }

  findAll() {
    return `This action returns all rrhh`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rrhh`;
  }

  update(id: number, updateRrhhDto: UpdateRrhhDto) {
    return `This action updates a #${id} rrhh`;
  }

  remove(id: number) {
    return `This action removes a #${id} rrhh`;
  }
}
