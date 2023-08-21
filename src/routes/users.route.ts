import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['admin, user, teacher']), this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreateUserDto, true), this.user.createUser);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['admin']), ValidationMiddleware(CreateUserDto, true, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.user.deleteUser);
  }
}
