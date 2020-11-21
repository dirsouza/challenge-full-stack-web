import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'Infrastructure/databases';
import { StudentModule } from 'Infrastructure/modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    StudentModule,
  ],
})
export class AppModule {
}
