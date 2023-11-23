/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { Provincia } from 'src/empresa/entities/provincia.entity';
import { Localidad } from 'src/empresa/entities/localidad.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Injectable()
export class SucursalService {
  constructor(
    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,
    @InjectRepository(Localidad)
    private localidadRepository: Repository<Localidad>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}
  create(_createSucursalDto: CreateSucursalDto) {
    return 'This action adds a new sucursal';
  }

  async findAll(localidadId: number): Promise<Sucursal[]> {
    return this.sucursalRepository.find({
      where: {
        localidad: { id: localidadId },
      },
    });
  }

  async findOne(id: number) {
    return this.sucursalRepository.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, _updateSucursalDto: UpdateSucursalDto) {
    return `This action updates a #${id} sucursal`;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursal`;
  }

  findAllProvincia(empresaId: number) {
    return this.provinciaRepository.find({
      where: {
        empresa: { id: empresaId },
      },
    });
  }

  async findAllLocalidad(provinciaId: number): Promise<Localidad[]> {
    return this.localidadRepository.find({
      where: {
        provincia: { id: provinciaId },
      },
    });
  }
}
