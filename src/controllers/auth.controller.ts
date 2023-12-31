import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { Admin } from '@/interfaces/admins.interface';

export class AuthController {
  public auth = Container.get(AuthService);

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const { cookie, findUser } = await this.auth.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public signUpAdminOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: Admin = req.body;
      const data = await this.auth.signupAdminOtp(adminData);

      res.status(200).json({ data, message: 'Message sent to email' });
    } catch (error) {
      next(error);
    }
  };

  public signUpAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminData: Admin = req.body;
      const codeNumber = req.params as any;

      const token = await this.auth.signupAdmin(adminData, codeNumber.code);

      res.status(200).json({ token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}
