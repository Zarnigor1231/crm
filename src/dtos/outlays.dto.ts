import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateOutlayDto {
  @IsString()
  @IsNotEmpty()
  public reason: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;
}

export class UpdateOutlayDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public reason: string;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  public amount: number;
}
