import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { Localidad } from './entities/localidad.entity';
import { Sucursal } from './entities/sucursal.entity';
import { Pagination } from 'src/utils/pagination';

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
  async findAll(pagination: Pagination) {
    const skip = (pagination.page - 1) * pagination.limit;
    const rowCount = await this.empresaRepository.count();

    const empresas = await this.empresaRepository
      .createQueryBuilder('empresa')
      .where('empresa.nombre LIKE :nombre', {
        nombre: `%${pagination.search}%`,
      })
      .take(pagination.limit) // limits it to X
      .skip(skip) // offset X entities
      .getMany();

    return {
      page: pagination.page,
      limit: pagination.limit,
      total: rowCount,
      data: empresas,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} empresa`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return `This action updates a #${id} empresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} empresa`;
  }
}
