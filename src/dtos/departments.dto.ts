import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsBoolean } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  public center: string;
}

export class UpdateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public center: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public isDelete: boolean;
}
