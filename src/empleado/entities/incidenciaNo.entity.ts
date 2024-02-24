import { Sucursal } from 'src/empresa/entities/sucursal.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class IncidenciaNo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', unique: true, nullable: false })
  nroReferencia: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  legajo: string;

  @Column({ type: 'varchar', length: 100 })
  direccion: string;

  @Column({ type: 'varchar', length: 25 })
  celular: string;

  @Column({ type: 'varchar', length: 1000 })
  motivo: string;

  @Column({ type: 'varchar', length: 1000 })
  nombreSucursal: string;

  @Column({ type: 'boolean', default: false })
  certificado: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombreImagen: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombreAws: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  urlImagen: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.incidencias)
  user: User;

  @ManyToOne(() => Sucursal, (sucursal) => sucursal.incidenciasNo)
  sucursal: Sucursal;

  @Column({ type: 'varchar', length: 1000, default:"NO CONTROL"  })
  control: string;

  @Column({ type: 'varchar', length: 1000, default:"NO"  })
  justificado: string;
}
