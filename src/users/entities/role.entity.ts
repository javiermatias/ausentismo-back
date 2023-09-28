// Role Entity
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  roleName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;
}
