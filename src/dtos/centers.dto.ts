import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public work_date: string;
}

export class UpdateCenterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public address: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public work_date: string;
}
