import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { OutlayController } from '@/controllers/outlay.controller';
import { CreateOutlayDto, UpdateOutlayDto } from '@/dtos/outlays.dto';

export class OutlayRoute implements Routes {
  public path = '/outlay';
  public router = Router();
  public outlay = new OutlayController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['user']), this.outlay.getOutlays);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['user']), this.outlay.getOutlayById);
    this.router.post(`${this.path}`, AuthMiddleware(['user']), ValidationMiddleware(CreateOutlayDto, true), this.outlay.createOutlay);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['user']), ValidationMiddleware(UpdateOutlayDto, true, true), this.outlay.updateOutlay);
  }
}
