import { PickType } from '@nestjs/swagger';
import { StudentDto } from 'Domain/dtos';

export class CreateStudentDto extends PickType(StudentDto, ['name', 'email', 'ra', 'cpf'] as const) {}
