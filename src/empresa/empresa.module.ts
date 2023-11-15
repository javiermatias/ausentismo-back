import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { Sucursal } from './entities/sucursal.entity';
import { Localidad } from './entities/localidad.entity';
import { Provincia } from './entities/provincia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa, Sucursal, Localidad, Provincia]),
  ],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
