import { EntityRepository, Repository } from 'typeorm';
import { Student } from 'Domain/entities';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {}
