import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from 'App/controllers';
import { StudentService } from 'Domain/services';
import { StudentDto } from 'Domain/dtos';

const mockService = () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
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

describe('StudentController', () => {
  let studentController;
  let studentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [{
        provide: StudentService,
        useFactory: mockService,
      }],
    }).compile();

    studentController = await module.get<StudentController>(StudentController);
    studentService = await module.get<StudentService>(StudentService);
  });

  it('should controller be defined', () => {
    expect(studentController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return successfully registered the students', async () => {
      studentService.findAll.mockResolvedValue(mockStudents);
      expect(studentService.findAll).not.toBeCalled();

      const result = await studentController.findAll();

      expect(studentService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents);
    });

    it('should return registered the students based on a search term', async () => {
      studentService.findAll.mockResolvedValue([mockStudents[0]]);
      expect(studentService.findAll).not.toBeCalled();

      const result = await studentController.findAll({ search: 'any' });

      expect(studentService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockStudents[0]]);
    });
  });

  describe('create()', () => {
    it('should register a student', async () => {
      studentService.create.mockResolvedValue(mockStudents[0]);
      expect(studentService.create).not.toBeCalled();

      const result = await studentController.create({});

      expect(studentService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents[0]);
    });
  });

  describe('update()', () => {
    it('should update student data', async () => {
      studentService.update.mockResolvedValue(true);
      expect(studentService.update).not.toBeCalled();

      const result = await studentController.update({});

      expect(studentService.update).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });

  describe('delete()', () => {
    it('should delete a student', () => {
      studentService.delete.mockResolvedValue(true);
      expect(studentService.delete).not.toBeCalled();

      const result = studentController.delete(1);

      expect(studentService.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeTruthy();
    });
  });
});
