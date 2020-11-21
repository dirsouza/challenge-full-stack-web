import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository, UpdateResult } from 'typeorm';
import { Student } from 'Domain/entities';
import { CreateStudentDto, FilterDto, StudentDto, UpdateStudentDto } from 'Domain/dtos';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findAllStudent({ search }: FilterDto): Promise<Array<StudentDto>> {
    try {
      let query = this.createQueryBuilder('students');

      if (search) {
        query.where('students.name like :search', { search: `%${ search }%` })
          .orWhere('CAST(students.ra as CHAR) like :search', { search: `%${ search }%` })
          .orWhere('students.cpf like :search', { search: `%${ search }%` });
      }

      return await query.getMany();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<StudentDto> {
    try {
      const student = this.create({
        ...createStudentDto,
      });

      return await this.save(student);
    } catch (e) {
      if (e.errno === 1062) {
        throw new ConflictException('Studant already exists');
      }

      throw new InternalServerErrorException(e.message);
    }
  }

  async updateStudent(studentDto: StudentDto, updateStudentDto: UpdateStudentDto): Promise<UpdateResult> {
    try {
      const { name, email } = updateStudentDto;
      let payload = {};

      payload = this.validProperty('name', name, payload);
      payload = this.validProperty('email', email, payload);

      if (!Object.keys(payload).length) {
        throw new Error('No fields were reported');
      }

      return await this.update(studentDto.id, payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteStudent(studentDto: StudentDto): Promise<DeleteResult> {
    try {
      return await this.delete(studentDto.id);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  private validProperty(name: string, property: any, payload: object): object {
    if (property) {
      return payload = {
        ...payload,
        [name]: property,
      }
    }

    return payload;
  }
}
