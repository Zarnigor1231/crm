import { Outlay } from '@/interfaces/outlays.interface';
import { OutlayService } from '@/services/outlays.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class OutlayController {
  public Outlay = Container.get(OutlayService);

  public getOutlays = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOutlaysData: Outlay[] = await this.Outlay.findAllOutlay();

      res.status(200).json({ data: findAllOutlaysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOutlayById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OutlayId: string = req.params.id;
      const findOneOutlayData: Outlay = await this.Outlay.findOutlayById(OutlayId);

      res.status(200).json({ data: findOneOutlayData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOutlay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OutlayData: Outlay = req.body;
      const createOutlayData: Outlay = await this.Outlay.createOutlay(OutlayData);

      res.status(201).json({ data: createOutlayData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOutlay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const OutlayId: string = req.params.id;
      const OutlayData: Outlay = req.body;
      const updateOutlayData: Outlay = await this.Outlay.updateOutlay(OutlayId, OutlayData);

      res.status(200).json({ data: updateOutlayData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
}
