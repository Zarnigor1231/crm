// import { Router } from 'express';
// import { Routes } from '@interfaces/routes.interface';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';

// export class AdminRoute implements Routes {
//   public path = '/Admins';
//   public router = Router();
//   public admin = new AdminController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.get(`${this.path}`, this.admin.getAdmins);
//     this.router.get(`${this.path}/:id`, this.admin.getAdminById);
//     this.router.post(`${this.path}`, ValidationMiddleware(CreateAdminDto, 'body'), this.admin.createAdmin);
//     this.router.put(`${this.path}/:id`, ValidationMiddleware(CreateAdminDto, 'body', true), this.admin.updateAdmin);
//     this.router.delete(`${this.path}/:id`, this.admin.deleteAdmin);
//   }
// }
