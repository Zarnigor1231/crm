import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { CreateGroupDto, UpdateGroupDto } from '@/dtos/groups.dto';
import { GroupController } from '@/controllers/groups.contoller';

export class GroupRoute implements Routes {
  public path = '/group';
  public router = Router();
  public group = new GroupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware(['admin, teacher']), this.group.getGroups);
    this.router.get(`${this.path}/:id`, AuthMiddleware(['admin, teacher']), this.group.getGroupById);
    this.router.post(`${this.path}`, AuthMiddleware(['admin']), ValidationMiddleware(CreateGroupDto, true), this.group.createGroup);
    this.router.put(`${this.path}/:id`, AuthMiddleware(['admin']), ValidationMiddleware(UpdateGroupDto, true, true), this.group.updateGroup);
    this.router.delete(`${this.path}/:id`, AuthMiddleware(['admin']), this.group.deleteGroup);
  }
}
