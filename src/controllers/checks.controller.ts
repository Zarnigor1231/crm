import { Check } from '@/interfaces/checks.interface';
import { CheckService } from '@/services/checks.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CheckController {
  public check = Container.get(CheckService);

  public getChecks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllChecksData: Check[] = await this.check.findAllCheck();

      res.status(200).json({ data: findAllChecksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCheckById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CheckId: string = req.params.id;
      const findOneCheckData: Check = await this.check.findCheckById(CheckId);

      res.status(200).json({ data: findOneCheckData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CheckData: Check = req.body;
      const createCheckData: Check = await this.check.createCheck(CheckData);

      res.status(201).json({ data: createCheckData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CheckId: string = req.params.id;
      const CheckData: Check = req.body;
      const updateCheckData: Check = await this.check.updateCheck(CheckId, CheckData);

      res.status(200).json({ data: updateCheckData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
