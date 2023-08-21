import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { IncomeController } from '@/controllers/incomes.controller';
import { CreateIncomeDto, UpdateIncomeDto } from '@/dtos/incomes.dto';

export class IncomeRoute implements Routes {
  public path = '/income';
  public router = Router();
  public income = new IncomeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['user']), this.income.getIncomes);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['user']), this.income.getIncomeById);
    this.router.post(`${this.path}`, AuthMiddleware(['user']), ValidationMiddleware(CreateIncomeDto, true), this.income.createIncome);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['user']), ValidationMiddleware(UpdateIncomeDto, true, true), this.income.updateIncome);
  }
}
