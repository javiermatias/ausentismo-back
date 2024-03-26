import { Injectable } from '@nestjs/common';
import { CreateRrhhDto } from './dto/create-rrhh.dto';
import { UpdateRrhhDto } from './dto/update-rrhh.dto';

@Injectable()
export class RrhhService {
  create(createRrhhDto: CreateRrhhDto) {
    return 'This action adds a new rrhh';
  }

  findAll() {
    return `This action returns alla rrhh`;
  }


}
