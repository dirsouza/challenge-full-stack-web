import { Controller } from '@nestjs/common';
import { StudentService } from 'Domain/services';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}
}
