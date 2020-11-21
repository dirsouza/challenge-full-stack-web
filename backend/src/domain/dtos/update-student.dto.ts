import { PartialType, PickType } from '@nestjs/swagger';
import { StudentDto } from 'Domain/dtos';

export class UpdateStudentDto extends PartialType(
  PickType(StudentDto, ['name', 'email'] as const),
) {}
