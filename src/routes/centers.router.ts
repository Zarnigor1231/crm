import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CenterController } from '@/controllers/centers.controller';
import { CreateCenterDto, UpdateCenterDto } from '@/dtos/centers.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class CenterRoute implements Routes {
  public path = '/center';
  public router = Router();
  public center = new CenterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.center.getCenters);
    this.router.get(`${this.path}/:id`, this.center.getCenterById);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreateCenterDto, true), this.center.createCenter);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['admin']), ValidationMiddleware(UpdateCenterDto, true, true), this.center.updateCenter);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.center.deleteCenter);
  }
}
