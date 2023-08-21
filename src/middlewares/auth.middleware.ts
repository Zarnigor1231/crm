import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { UserModel } from '@models/users.model';
import { AdminModel } from '@/models/admin.model';

export const getAuthorization = req => {
  // const cookie = req.cookies['Authorization'];
  // if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = (roles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = getAuthorization(req);

      if (Authorization) {
        const { _id } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;

        let findUser;

        if (roles.includes('admin')) {
          findUser = await AdminModel.findOne({ _id });

          if (!findUser) {
            return res.status(403).json({
              message: 'You do not have administrator rights',
            });
          }
        } else if (roles.includes('user')) {
          findUser = await UserModel.findOne({ _id });

          if (!findUser || findUser.role !== 'user') {
            return res.status(403).json({
              message: 'You do not have user rights',
            });
          }
          res.locals.user = findUser;
        } else if (roles.includes('teacher')) {
          findUser = await UserModel.findOne({ _id });

          if (!findUser || findUser.role !== 'teacher') {
            return res.status(403).json({
              message: 'You do not have teacher rights',
            });
          }
          res.locals.user = findUser;
        }

        if (findUser) {
          req.user = findUser;
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };
};
