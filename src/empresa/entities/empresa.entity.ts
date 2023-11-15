import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sucursal } from './sucursal.entity';
import { Localidad } from './localidad.entity';
import { Provincia } from './provincia.entity';

@Entity()
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  razonSocial: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.empresa)
  sucursales: Sucursal[];

  @OneToMany(() => Localidad, (localidad) => localidad.empresa)
  localidades: Localidad[];

  @OneToMany(() => Provincia, (provincia) => provincia.empresa)
  provincias: Provincia[];
}
