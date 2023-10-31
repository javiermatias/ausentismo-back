import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sucursal } from './sucursal.entity';

@Entity()
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreLocalidad: string;

  @Column()
  direccionLocalidad: string;

  @OneToMany(() => Sucursal, (sucursal) => sucursal.localidad)
  sucursales: Sucursal[];
}
