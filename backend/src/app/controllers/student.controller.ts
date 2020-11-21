import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse, ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StudentService } from 'Domain/services';
import { CreateStudentDto, ExceptionDto, FilterDto, StudentDto, UpdateStudentDto } from 'Domain/dtos';

@ApiTags('Students')
@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List students' })
  @ApiOkResponse({ description: 'Success', type: [StudentDto] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ExceptionDto })
  findAll(@Query(ValidationPipe) filter: FilterDto): Promise<Array<StudentDto>> {
    return this.studentService.findAll(filter);
  }

  @Post()
  @ApiOperation({ summary: 'Create student' })
  @ApiCreatedResponse({ description: 'Create', type: StudentDto })
  @ApiConflictResponse({ description: 'Conflict', type: ExceptionDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ExceptionDto })
  create(
    @Body(ValidationPipe) createStudentDto: CreateStudentDto
  ): Promise<StudentDto> {
    return this.studentService.create(createStudentDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update student' })
  @ApiOkResponse({ description: 'Success', type: Boolean })
  @ApiNotFoundResponse({ description: 'NotFound', type: ExceptionDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ExceptionDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateStudentDto: UpdateStudentDto
  ): Promise<boolean> {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete student' })
  @ApiOkResponse({ description: 'Success', type: Boolean })
  @ApiNotFoundResponse({ description: 'NotFound', type: ExceptionDto })
  @ApiInternalServerErrorResponse({ description: 'Internal server error', type: ExceptionDto })
  delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.studentService.delete(id);
  }
}
