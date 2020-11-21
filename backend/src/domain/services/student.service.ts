import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { StudentRepository } from 'Domain/repositories';
import { CreateStudentDto, FilterDto, StudentDto, UpdateStudentDto } from 'Domain/dtos';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
  ) {}

  async findById(id: number): Promise<StudentDto> {
    return await this.studentRepository.findOne(id);
  }

  async findAll(filter: FilterDto): Promise<Array<StudentDto>> {
    return this.studentRepository.findAllStudent(filter);
  }

  async create(createStudentDto: CreateStudentDto): Promise<StudentDto> {
    return this.studentRepository.createStudent(createStudentDto);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<boolean> {
    const student: StudentDto = await this.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with ID '${ id }' not found`);
    }

    const result: UpdateResult = await this.studentRepository.updateStudent(student, updateStudentDto);

    return !(result.affected === 0);
  }

  async delete(id: number): Promise<boolean> {
    const student: StudentDto = await this.findById(id);

    if (!student) {
      throw new NotFoundException(`Student with ID '${ id }' not found`);
    }

    const result: DeleteResult = await this.studentRepository.deleteStudent(student);

    return !(result.affected === 0);
  }
}
