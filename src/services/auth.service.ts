import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { Admin } from '@/interfaces/admins.interface';
import { AdminModel } from '@/models/admin.model';
import { OtpModel } from '@/models/otp.model';
import sendEmail from '@/utils/send.email';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createTokenAdmin = (_id): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id };
  const expiresIn: number = 60 * 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await UserModel.findOne({ email: userData.email, contact: userData.contact });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} or ${userData.contact}  was not found`);

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }

  public async signupAdminOtp(adminData: Admin) {
    const findAdmin: Admin = await AdminModel.findOne({ email: adminData.email });
    if (findAdmin) throw new HttpException(409, `This email ${adminData.email} already exists`);

    const findOtp = await OtpModel.findOne({ email: adminData.email });

    if (findOtp) {
      throw new HttpException(409, `This email ${adminData.email} has already exist`);
    }

    const code = Math.floor(1000 + Math.random() * 9000);

    await OtpModel.create({ email: adminData.email, code });

    await sendEmail(adminData.email, code);

    await AdminModel.create({ email: adminData.email, phone: adminData.phone });

    return { message: `Sent a verification code to this email ${adminData.email}` };
  }

  public async signupAdmin(adminData: Admin, code: number) {
    const findOtp = await OtpModel.findOne({ code });

    if (!findOtp) {
      throw new HttpException(409, `This email ${adminData.email} has not found`);
    }

    const findAdmin: Admin = await AdminModel.findOne({ email: findOtp.email });

    if (!findAdmin) {
      throw new HttpException(409, `This email ${findAdmin.email} has not found`);
    }
    if (code != findOtp.code) {
      throw new HttpException(409, `This code ${code} incorrect`);
    }

    const { token } = createTokenAdmin({ _id: findAdmin._id });

    return token;
  }
}
