import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CheckController } from '@/controllers/checks.controller';
import { CreateCheckDto, UpdateCheckDto } from '@/dtos/checks.dto';

export class CheckRoute implements Routes {
  public path = '/check';
  public router = Router();
  public check = new CheckController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['teacher']), this.check.getChecks);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['teacher']), this.check.getCheckById);
    this.router.post(`${this.path}`, AuthMiddleware(['teacher']), ValidationMiddleware(CreateCheckDto, true), this.check.createCheck);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['teacher']), ValidationMiddleware(UpdateCheckDto, true, true), this.check.updateCheck);
  }
}
