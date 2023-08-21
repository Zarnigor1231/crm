import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  public email: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  public phone: number;
}
