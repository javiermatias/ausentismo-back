import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { Localidad } from './localidad.entity';

@Entity()
export class Sucursal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @ManyToOne(() => Empresa, (empresa) => empresa.sucursales)
  empresa: Empresa;

  @ManyToOne(() => Localidad, (localidad) => localidad.sucursales)
  localidad: Localidad;
}
