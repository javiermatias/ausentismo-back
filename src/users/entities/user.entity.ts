import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Incidencia } from 'src/empleado/entities/incidencia.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true, nullable: false })
  dni: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @OneToMany(() => Incidencia, (incidencia) => incidencia.user)
  incidencias: Incidencia[];

  // Define the Many-to-One relationship to Role entity
  // Define the many-to-one relationship with Role
  @ManyToOne(() => Role, { eager: true })
  role: Role;

  // Define the Many-to-One relationship to Role entity
  // Define the many-to-one relationship with Role
  @ManyToOne(() => Empresa, { eager: true })
  empresa: Empresa;
}
