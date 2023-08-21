import { Direction } from '@/interfaces/directions.interface';
import { DirectionService } from '@/services/directions.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class DirectionController {
  public direction = Container.get(DirectionService);

  public getDirections = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllDirectionsData: Direction[] = await this.direction.findAllDirection();

      res.status(200).json({ data: findAllDirectionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDirectionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId = req.params;
      const findOneDirectionData = await this.direction.findDirectionById(departmentId.id as string);

      res.status(200).json({ data: {findOneDirectionData}, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDirection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DirectionData: Direction = req.body;
      const createDirectionData: Direction = await this.direction.createDirection(DirectionData);

      res.status(201).json({ data: createDirectionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDirection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DirectionId: string = req.params.id;
      const DirectionData: Direction = req.body;
      const updateDirectionData: Direction = await this.direction.updateDirection(DirectionId, DirectionData);

      res.status(200).json({ data: updateDirectionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDirection = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const DirectionId: string = req.params.id;
      const deleteDirectionData: Direction = await this.direction.deleteDirection(DirectionId);

      res.status(200).json({ data: deleteDirectionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
