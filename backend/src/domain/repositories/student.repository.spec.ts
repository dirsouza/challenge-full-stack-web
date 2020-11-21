import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StudentRepository } from 'Domain/repositories';
import { StudentDto } from 'Domain/dtos';

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

describe('StudentRepository', () => {
  let studentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentRepository],
    }).compile();

    studentRepository = await module.get<StudentRepository>(StudentRepository);
  });

  it('should repository be defined', () => {
    expect(studentRepository).toBeDefined();
  });

  describe('findAllStudent()', () => {
    it('should return students successfully', async () => {
      studentRepository.createQueryBuilder = jest.fn().mockReturnValue({
        getMany: jest.fn().mockResolvedValue(mockStudents),
      });
      expect(studentRepository.createQueryBuilder).not.toBeCalled();

      const result = await studentRepository.findAllStudent({search: null});

      expect(studentRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents);
    });

    it('should return students successfully based on the search term', async () => {
      studentRepository.createQueryBuilder = jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        orWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockStudents[0]]),
      });
      expect(studentRepository.createQueryBuilder).not.toBeCalled();

      const result = await studentRepository.findAllStudent({search: 'any_name_1'});

      expect(studentRepository.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockStudents[0]]);
    });

    it('should throw an erro when trying to return students', async () => {
      studentRepository.createQueryBuilder = jest.fn().mockReturnValue({
        getMany: jest.fn().mockRejectedValue(new InternalServerErrorException()),
      });

      await expect(studentRepository.findAllStudent({search: null}))
        .rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('createStudent()', () => {
    it('should register a new student successfully', async () => {
      studentRepository.create = jest.fn();
      studentRepository.save = jest.fn().mockResolvedValue(mockStudents[0]);
      expect(studentRepository.create).not.toBeCalled();
      expect(studentRepository.save).not.toBeCalled();

      const result = await studentRepository.createStudent(mockStudents[0]);

      expect(studentRepository.create).toHaveBeenCalledTimes(1);
      expect(studentRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents[0]);
    });

    it('should throw an error when trying to register a new student due to duplication', async () => {
      studentRepository.create = jest.fn();
      studentRepository.save = jest.fn().mockRejectedValue({errno: 1062});

      await expect(studentRepository.createStudent({})).rejects.toThrow(ConflictException);
    });

    it('should throw an error when trying to register a new student', async () => {
      studentRepository.create = jest.fn();
      studentRepository.save = jest.fn().mockRejectedValue(new InternalServerErrorException());

      await expect(studentRepository.createStudent({})).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateStudent()', () => {
    it('should update a student successfully', async () => {
      studentRepository.update = jest.fn().mockResolvedValue({ affected: 1 });
      expect(studentRepository.update).not.toBeCalled();

      const mockUpdate = {
        name: 'any_name',
        email: 'any_email',
      };

      const result = await studentRepository.updateStudent(mockStudents[0], mockUpdate);

      expect(studentRepository.update).toHaveBeenCalledTimes(1);
      expect(studentRepository.update).toHaveBeenCalledWith(1, mockUpdate);
      expect(result).toEqual({ affected: 1 });
    });

    it('should update the student\'s name successfully', async () => {
      studentRepository.update = jest.fn().mockResolvedValue({ affected: 1 });
      expect(studentRepository.update).not.toBeCalled();

      const mockUpdate = {
        name: 'any_name',
      };

      const result = await studentRepository.updateStudent(mockStudents[0], mockUpdate);

      expect(studentRepository.update).toHaveBeenCalledTimes(1);
      expect(studentRepository.update).toHaveBeenCalledWith(1, mockUpdate);
      expect(result).toEqual({ affected: 1 });
    });

    it('should update the student\'s email successfully', async () => {
      studentRepository.update = jest.fn().mockResolvedValue({ affected: 1 });
      expect(studentRepository.update).not.toBeCalled();

      const mockUpdate = {
        email: 'any_email',
      };

      const result = await studentRepository.updateStudent(mockStudents[0], mockUpdate);

      expect(studentRepository.update).toHaveBeenCalledTimes(1);
      expect(studentRepository.update).toHaveBeenCalledWith(1, mockUpdate);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw an error if the student\'s data for update is not informed', async () => {
      studentRepository.update = jest.fn().mockRejectedValue(new InternalServerErrorException());

      await expect(studentRepository.updateStudent({}, {}))
        .rejects.toThrow(InternalServerErrorException);
    });

    it('should throw an error when trying to update student data', async () => {
      studentRepository.update = jest.fn().mockRejectedValue(new InternalServerErrorException());

      await expect(studentRepository.updateStudent({}, {}))
        .rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('deleteStudent()', () => {
    it('should successfully delete a student', async () => {
      studentRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });
      expect(studentRepository.delete).not.toBeCalled();

      const result = await studentRepository.deleteStudent(mockStudents[0]);

      expect(studentRepository.delete).toHaveBeenCalledTimes(1);
      expect(studentRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw an error when trying to delete a student', async () => {
      studentRepository.delete = jest.fn().mockRejectedValue(new InternalServerErrorException());

      await expect(studentRepository.deleteStudent({}))
        .rejects.toThrow(InternalServerErrorException);
    });
  });
});
