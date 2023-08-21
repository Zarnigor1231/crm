import { UserGender, UserOrTeacher } from '@/shared/user_gender';
import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum, IsMongoId } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsString()
  @IsEnum(UserGender)
  @IsNotEmpty()
  public gender: UserGender;

  @IsString()
  @IsNotEmpty()
  public contact: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  @IsEnum(UserOrTeacher)
  public role: string;

  @IsString()
  @IsNotEmpty()
  public come_date: string;

  @IsString()
  @IsNotEmpty()
  public left_date: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public groupID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  public positionID: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  public fullName: string;

  @IsString()
  @IsEnum(UserGender)
  @IsNotEmpty()
  @IsOptional()
  public gender: UserGender;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public contact: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public come_date: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public left_date: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public groupID: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  public positionID: string;
}
