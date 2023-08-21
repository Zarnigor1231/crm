import { Department } from '@/interfaces/departments.interface';
import { DepartmentService } from '@/services/departments.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class DepartmentController {
  public department = Container.get(DepartmentService);

  public getDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const positionNameOrDirectionsName = req.query;
      const findAllDepartmentsData = await this.department.findAllDepartment(positionNameOrDirectionsName);

      res.status(200).json({ data: findAllDepartmentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId: string = req.params.id;
      const findOneDepartmentData = await this.department.findDepartmentById(departmentId);

      res.status(200).json({ data: findOneDepartmentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentData: Department = req.body;
      const createDepartmentData: Department = await this.department.createDepartment(departmentData);

      res.status(201).json({ data: createDepartmentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId: string = req.params.id;
      const departmentData: Department = req.body;
      const updateDepartmentData: Department = await this.department.updateDepartment(departmentId, departmentData);

      res.status(200).json({ data: updateDepartmentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departmentId: string = req.params.id;
      const deleteDepartmentData: Department = await this.department.deleteDepartment(departmentId);

      res.status(200).json({ data: deleteDepartmentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
