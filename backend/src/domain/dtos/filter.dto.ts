import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(100)
  search: string;
}
