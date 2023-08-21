import { IsString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreateCheckDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public groupID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public userID: string;

  @IsString()
  @IsNotEmpty()
  public not_in_class: string;
}

export class UpdateCheckDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public groupID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public userID: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public not_in_class: string;
}
