import { Income } from '@/interfaces/incomes.interface';
import { IncomeService } from '@/services/incomes.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class IncomeController {
  public Income = Container.get(IncomeService);

  public getIncomes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllIncomesData: Income[] = await this.Income.findAllIncome();

      res.status(200).json({ data: findAllIncomesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getIncomeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IncomeId: string = req.params.id;
      const findOneIncomeData: Income = await this.Income.findIncomeById(IncomeId);

      res.status(200).json({ data: findOneIncomeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createIncome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IncomeData: Income = req.body;
      const createIncomeData: Income = await this.Income.createIncome(IncomeData);

      res.status(201).json({ data: createIncomeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateIncome = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const IncomeId: string = req.params.id;
      const IncomeData: Income = req.body;
      const updateIncomeData: Income = await this.Income.updateIncome(IncomeId, IncomeData);

      res.status(200).json({ data: updateIncomeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
