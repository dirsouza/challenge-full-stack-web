import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'App/controllers';
import { StudentService } from 'Domain/services';
import { Student } from 'Domain/entities';
import { StudentRepository } from 'Domain/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentRepository])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {
}
