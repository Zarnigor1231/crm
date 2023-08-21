import { IsString, IsNotEmpty, IsMongoId, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  public direction: string;

  @IsNumber()
  @IsNotEmpty()
  public group_number: number;

  @IsString()
  @IsNotEmpty()
  public begin_end_date: string;
}

export class UpdateGroupDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @IsOptional()
  public direction: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public group_number: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public begin_end_date: string;
}
