import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Incidencia {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  legajo: string;

  @Column({ type: 'varchar', length: 25 })
  celular: string;

  @Column({ type: 'varchar', length: 255 })
  enfermedad: string;

  @Column({ type: 'varchar', length: 1000 })
  sintomas: string;

  @Column({ type: 'varchar', length: 1000 })
  medicacion: string;

  @Column({ type: 'boolean', default: false })
  asistencia: boolean;

  @Column({ type: 'boolean', default: false })
  certificado: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombreImagen: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nombreAws: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  urlImagen: string;

  @ManyToOne(() => User, (user) => user.incidencias)
  user: User;
}

// export interface Incidencia {
//   nombre: string;
//   email: string;
//   legajo: string;
//   celular: string;
//   enfermedad: string;
//   sintomas: string;
//   medicacion: string;
//   asistencia: boolean;
//   certificado: boolean;
// }
