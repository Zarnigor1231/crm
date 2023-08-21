import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  public departmentID: string;

  @IsNumber()
  @IsNotEmpty()
  public salary: number;
}

export class UpdatePositionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public departmentID: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public salary: number;
}
