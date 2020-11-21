import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  MaxLength, MinLength, Validate,
} from 'class-validator';
import { CpfValidator } from 'Infrastructure/validators';
import { ApiProperty } from '@nestjs/swagger';

export class StudentDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty({
    type: String,
    example: 'Robert Downey Jr.'
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(60)
  @ApiProperty({
    type: String,
    example: 'robert.downey@email.com'
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 101010,
  })
  ra: number;

  @IsNotEmpty()
  @Validate(CpfValidator)
  @IsNumberString({ no_symbols: true })
  @Length(11, 11)
  @ApiProperty({
    type: String,
    example: '58428118240'
  })
  cpf: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
