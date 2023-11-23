import { Module } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { SucursalController } from './sucursal.controller';
import { ProvinciaController } from './provincia.controller';
import { LocalidadController } from './localidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localidad } from 'src/empresa/entities/localidad.entity';
import { Provincia } from 'src/empresa/entities/provincia.entity';
import { Sucursal } from 'src/empresa/entities/sucursal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sucursal, Localidad, Provincia])],
  controllers: [SucursalController, ProvinciaController, LocalidadController],
  providers: [SucursalService],
  exports: [SucursalService],
})
export class SucursalModule {}
