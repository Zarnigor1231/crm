import { Router } from 'express';
import { AuthController } from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateAdminDto } from '@/dtos/admin.dto';

export class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}login-user`, ValidationMiddleware(CreateUserDto, true), this.auth.logIn);
    this.router.post(`${this.path}admin-signup-otp`, ValidationMiddleware(CreateAdminDto, true), this.auth.signUpAdminOtp);
    this.router.get(`${this.path}admin-signup/:code`, ValidationMiddleware(CreateUserDto, true), this.auth.signUpAdmin);
    this.router.post(`${this.path}admin-login`, ValidationMiddleware(CreateUserDto, true), this.auth.logIn);
    this.router.post(`${this.path}logout`, AuthMiddleware, this.auth.logOut);
  }
}
