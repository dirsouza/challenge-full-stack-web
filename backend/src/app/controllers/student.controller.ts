import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { StudentService } from 'Domain/services';
import { CreateStudentDto, FilterDto, StudentDto, UpdateStudentDto } from 'Domain/dtos';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @Get()
  findAll(@Query(ValidationPipe) filter: FilterDto): Promise<Array<StudentDto>> {
    return this.studentService.findAll(filter);
  }

  @Post()
  create(
    @Body(ValidationPipe) createStudentDto: CreateStudentDto
  ): Promise<StudentDto> {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto
  ): Promise<boolean> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.studentService.delete(id);
  }
}
