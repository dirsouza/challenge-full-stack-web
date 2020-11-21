import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from 'Domain/repositories';
import { StudentController } from 'App/controllers';
import { StudentService } from 'Domain/services';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {
}
