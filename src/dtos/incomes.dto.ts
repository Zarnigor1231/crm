import { IsString, IsNotEmpty, IsOptional, IsNumber, IsMongoId } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  @IsNotEmpty()
  public reason: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public userID: string;
}

export class UpdateIncomeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public reason: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public userID: string;
}
