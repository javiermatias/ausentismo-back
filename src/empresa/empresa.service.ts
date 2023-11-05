import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { Localidad } from './entities/localidad.entity';
import { Sucursal } from './entities/sucursal.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
    @InjectRepository(Localidad)
    private localidadRepository: Repository<Localidad>,
    @InjectRepository(Sucursal)
    private sucursalRepository: Repository<Sucursal>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    return await this.empresaRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const empresa = await transactionalEntityManager.save(
          Empresa,
          createEmpresaDto,
        );

        for (const localidad of createEmpresaDto.localidades) {
          const localidadS = await transactionalEntityManager.save(
            Localidad,
            localidad,
          );
          for (const sucursal of localidad.sucursales) {
            const sucursalDto = {
              nombre: sucursal.nombre,
              empresa: empresa,
              localidad: localidadS,
            };
            await transactionalEntityManager.save(Sucursal, sucursalDto);
          }
        }

        return empresa;
      },
    );
  }

  /*   async create(createEmpresaDto: CreateEmpresaDto) {
    const empresa = await this.empresaRepository.save(createEmpresaDto);

    for (const localidad of createEmpresaDto.localidades) {
      const localidadS = await this.localidadRepository.save(localidad);
      for (const sucursal of localidad.sucursales) {
        const sucursalDto = {
          nombre: sucursal.nombre,
          empresa: empresa,
          localidad: localidadS,
        };
        const sucursalS = await this.sucursalRepository.save(sucursalDto);
      }
    }

    return empresa;
  } */

  findAll() {
    return this.empresaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
