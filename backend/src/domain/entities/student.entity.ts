import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { transformerCpf } from 'Infrastructure/utils';

@Entity('students')
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 100,
  })
  name: string;

  @Column('varchar', {
    unique: true,
    length: 60,
  })
  email: string;

  @Column('integer', {
    unique: true,
  })
  ra: number;

  @Column('varchar', {
    unique: true,
    length: 11,
    transformer: transformerCpf,
  })
  cpf: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
