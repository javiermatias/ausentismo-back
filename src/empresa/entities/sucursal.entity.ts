import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empresa } from './empresa.entity';
import { Localidad } from './localidad.entity';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { IncidenciaNo } from 'src/empleado/entities/incidenciaNo.entity';

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

  @OneToMany(() => Incidencia, (incidencia) => incidencia.sucursal)
  incidencias: Incidencia[];

  @OneToMany(() => IncidenciaNo, (incidenciaNo) => incidenciaNo.sucursal)
  incidenciasNo: IncidenciaNo[];
}
