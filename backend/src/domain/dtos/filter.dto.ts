import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({
    required: false,
  })
  search: string;
}
