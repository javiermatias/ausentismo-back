import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Sucursal } from './sucursal.entity';
import { Provincia } from './provincia.entity';
import { Empresa } from './empresa.entity';

@Entity()
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.localidad)
  sucursales: Sucursal[];

  @ManyToOne(() => Provincia, (provincia) => provincia.localidades)
  provincia: Provincia;

  @ManyToOne(() => Empresa, (empresa) => empresa.localidades)
  empresa: Empresa;
}
