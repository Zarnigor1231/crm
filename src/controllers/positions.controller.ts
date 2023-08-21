import { Position } from '@/interfaces/positions.interface';
import { PositionService } from '@/services/positions.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class PositionController {
  public position = Container.get(PositionService);

  public getPositions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPositionsData: Position[] = await this.position.findAllPosition();

      res.status(200).json({ data: findAllPositionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDepartmentPositionName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId: string = req.params.id;
      const findOnePositionData = await this.position.getDepartmentPositionName(departmentId);

      res.status(200).json({ data: findOnePositionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPosition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PositionData: Position = req.body;
      const createPositionData: Position = await this.position.createPosition(PositionData);

      res.status(201).json({ data: createPositionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePosition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PositionId: string = req.params.id;
      const PositionData: Position = req.body;
      const updatePositionData: Position = await this.position.updatePosition(PositionId, PositionData);

      res.status(200).json({ data: updatePositionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePosition = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const PositionId: string = req.params.id;
      const deletePositionData: Position = await this.position.deletePosition(PositionId);

      res.status(200).json({ data: deletePositionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
