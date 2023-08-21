import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { PositionController } from '@/controllers/positions.controller';
import { CreatePositionDto, UpdatePositionDto } from '@/dtos/positions.dto';

export class PositionRoute implements Routes {
  public path = '/position';
  public router = Router();
  public position = new PositionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['admin']), this.position.getPositions);
    this.router.get(`/department`, AuthMiddleware(['admin']), this.position.getDepartmentPositionName);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreatePositionDto, true), this.position.createPosition);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['admin']), ValidationMiddleware(UpdatePositionDto, true, true), this.position.updatePosition);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.position.deletePosition);
  }
}
