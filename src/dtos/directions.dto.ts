import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateDirectionDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  public department: string;

  @IsString()
  @IsNotEmpty()
  public duration: string;

  @IsString()
  @IsNotEmpty()
  public word_date: string;

  @IsNumber()
  @IsNotEmpty()
  public salary: number;
}

export class UpdateDirectionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public department: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public duration: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public word_date: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public salary: number;
}
