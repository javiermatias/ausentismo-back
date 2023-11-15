import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Localidad } from './localidad.entity';
import { Empresa } from './empresa.entity';

@Entity()
export class Provincia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Localidad, (localidad) => localidad.provincia)
  localidades: Localidad[];

  @ManyToOne(() => Empresa, (empresa) => empresa.provincias)
  empresa: Empresa;
}
