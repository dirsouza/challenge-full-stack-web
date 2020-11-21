import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { StudentService } from 'Domain/services';
import { StudentRepository } from 'Domain/repositories';
import { StudentDto, UpdateStudentDto } from 'Domain/dtos';

const mockRepository = () => ({
  findOne: jest.fn(),
  findAllStudent: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
});

const mockStudents: Array<StudentDto> = [
  {
    id: 1,
    name: 'any_name_1',
    email: 'any_email_1',
    ra: 101010,
    cpf: '10110110110',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'any_name_2',
    email: 'any_email_2',
    ra: 202020,
    cpf: '20220220220',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'any_name_3',
    email: 'any_email_3',
    ra: 303030,
    cpf: '30330330330',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('StudentService', () => {
  let studentService;
  let studentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: StudentRepository,
          useFactory: mockRepository,
        },
      ],
    }).compile();

    studentService = await module.get<StudentService>(StudentService);
    studentRepository = await module.get<StudentRepository>(StudentRepository);
  });

  it('should service be defined', () => {
    expect(studentService).toBeDefined();
  });

  describe('findById()', () => {
    it('should calls studentRepository.findOne() with successfully and return the student', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      expect(studentRepository.findOne).not.toBeCalled();

      const result = await studentService.findById(1);

      expect(studentRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents[0]);
    });
  });

  describe('findAll()', () => {
    it('should calls studentRepository.findAllStudent() with successfully and returns the students', async () => {
      studentRepository.findAllStudent.mockResolvedValue(mockStudents);
      expect(studentRepository.findAllStudent).not.toBeCalled();

      const result = await studentService.findAll();

      expect(studentRepository.findAllStudent).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents);
    });

    it('should calls studentRepository.findAllStudent() with successfully and returns the students by search term', async () => {
      studentRepository.findAllStudent.mockResolvedValue([mockStudents[0]]);
      expect(studentRepository.findAllStudent).not.toBeCalled();

      const result = await studentService.findAll({search: '10110110110'});

      expect(studentRepository.findAllStudent).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockStudents[0]]);
    });
  });

  describe('create()', () => {
    it('should calls studentRepository.createStudent() with successfully and return the new student', async () => {
      studentRepository.createStudent.mockResolvedValue(mockStudents[0]);
      expect(studentRepository.createStudent).not.toBeCalled();

      const result = await studentService.create(mockStudents[0]);

      expect(studentRepository.createStudent).toHaveBeenCalledTimes(1);
      expect(studentRepository.createStudent).toHaveBeenCalledWith(mockStudents[0]);
      expect(result).toEqual(mockStudents[0]);
    });

    it('should throws error when trying to register a student', async () => {
      studentRepository.createStudent.mockRejectedValue(new InternalServerErrorException());

      await expect(studentService.create(mockStudents[0])).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update()', () => {
    it('should calls studentRepository.updateStudent() with successfully and return the result', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      studentRepository.updateStudent.mockResolvedValue({affected: 1});
      expect(studentRepository.updateStudent).not.toBeCalled();

      const mockUpdate: UpdateStudentDto = {
        name: 'any_valid',
        email: 'any_valid',
      };

      const result = await studentService.update(1, mockUpdate);

      expect(studentRepository.updateStudent).toHaveBeenCalledTimes(1);
      expect(studentRepository.updateStudent).toHaveBeenCalledWith(mockStudents[0], mockUpdate);
      expect(result).toBeTruthy();
    });

    it('should throw error for not finding the student by id', async () => {
      await expect(studentService.update(1, {})).rejects.toThrow(NotFoundException);
    });

    it('should throw error when trying to update student data', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      studentRepository.updateStudent.mockRejectedValue(new InternalServerErrorException());

      await expect(studentService.update(1, {})).rejects.toThrow(InternalServerErrorException);
    });

    it('should not update student data', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      studentRepository.updateStudent.mockResolvedValue({affected: 0});

      const mockUpdate: UpdateStudentDto = {
        name: 'any_valid',
        email: 'any_valid',
      };

      const result = await studentService.update(1, mockUpdate);

      expect(studentRepository.updateStudent).toHaveBeenCalledTimes(1);
      expect(studentRepository.updateStudent).toHaveBeenCalledWith(mockStudents[0], mockUpdate);
      expect(result).toBeFalsy();
    });
  });

  describe('delete()', () => {
    it('should calls studentRepository.deleteStudent() with successfully and return the result', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      studentRepository.deleteStudent.mockResolvedValue({affected: 1});
      expect(studentRepository.deleteStudent).not.toBeCalled();

      const result = await studentService.delete(1);

      expect(studentRepository.deleteStudent).toHaveBeenCalledTimes(1);
      expect(studentRepository.deleteStudent).toHaveBeenCalledWith(mockStudents[0]);
      expect(result).toBeTruthy();
    });

    it('should throw error for not finding the student by id', async () => {
      await expect(studentService.delete(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw error when trying to delete student', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      studentRepository.deleteStudent.mockRejectedValue(new InternalServerErrorException());

      await expect(studentService.delete(1)).rejects.toThrow(InternalServerErrorException);
    });

    it('should not delete student', async () => {
      studentRepository.findOne.mockResolvedValue(mockStudents[0]);
      studentRepository.deleteStudent.mockResolvedValue({affected: 0});

      const result = await studentService.delete(1);

      expect(studentRepository.deleteStudent).toHaveBeenCalledTimes(1);
      expect(studentRepository.deleteStudent).toHaveBeenCalledWith(mockStudents[0]);
      expect(result).toBeFalsy();
    });
  });
});
