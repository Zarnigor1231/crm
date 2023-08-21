import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { DirectionController } from '@/controllers/directions.controller';
import { CreateDirectionDto, UpdateDirectionDto } from '@/dtos/directions.dto';

export class DirectionRoute implements Routes {
  public path = '/direction';
  public router = Router();
  public direction = new DirectionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['admin']), this.direction.getDirections);
    this.router.get(`/department${this.path}/:id`, AuthMiddleware(['admin']), this.direction.getDirectionById);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreateDirectionDto, true), this.direction.createDirection);
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware(['admin']),
      ValidationMiddleware(UpdateDirectionDto, true, true),
      this.direction.updateDirection,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.direction.deleteDirection);
    // console.log(123);
  }
}
