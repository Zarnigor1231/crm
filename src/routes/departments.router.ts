import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { DepartmentController } from '@/controllers/departments.controller';
import { CreateDepartmentDto, UpdateDepartmentDto } from '@/dtos/departments.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class DepartmentRoute implements Routes {
  public path = '/department';
  public router = Router();
  public department = new DepartmentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['admin']), this.department.getDepartments);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['admin']), this.department.getDepartmentById);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreateDepartmentDto, true), this.department.createDepartment);
    this.router.put(
      `${this.path}/:id`,
      AuthMiddleware(['admin']),
      ValidationMiddleware(UpdateDepartmentDto, true, true),
      this.department.updateDepartment,
    );
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.department.deleteDepartment);
  }
}
