import { Center } from '@/interfaces/centers.interface';
import { CenterService } from '@/services/centers.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class CenterController {
  public center = Container.get(CenterService);

  public getCenters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCentersData: Center[] = await this.center.findAllCenter();

      res.status(200).json({ data: findAllCentersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCenterById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const centerId: string = req.params.id;
      const findOneCenterData: Center = await this.center.findCenterById(centerId);

      res.status(200).json({ data: findOneCenterData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const centerData: Center = req.body;
      const createCenterData: Center = await this.center.createCenter(centerData);

      res.status(201).json({ data: createCenterData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateCenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const centerId: string = req.params.id;
      const centerData: Center = req.body;
      const updateCenterData: Center = await this.center.updateCenter(centerId, centerData);

      res.status(200).json({ data: updateCenterData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const centerId: string = req.params.id;
      const deleteCenterData: Center = await this.center.deleteCenter(centerId);

      res.status(200).json({ data: deleteCenterData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
