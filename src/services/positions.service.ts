import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Position } from '@/interfaces/positions.interface';
import { PositionModel } from '@/models/positions.model';
import { Department } from '@/interfaces/departments.interface';
import { DepartmentModel } from '@/models/departments.model';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.model';

@Service()
export class PositionService {
  public async findAllPosition(): Promise<Position[]> {
    const positions: Position[] = await PositionModel.find().populate({ path: 'center', select: 'name' });
    return positions;
  }

  public async getDepartmentPositionById(positionName) {
    const findPosition: Position = await PositionModel.findOne({ name: positionName }).select('name');
    if (!findPosition) throw new HttpException(409, "Position doesn't exist");

    const findUser: User = await UserModel.findOne({ positionID: findPosition._id }).select('fullName');
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return { findPosition, findUser };
  }

  public async getDepartmentPositionName(departmentId: string) {
    const findPosition: Position = await PositionModel.findOne({ departmentID: new Object(departmentId) }).select('name');
    if (!findPosition) throw new HttpException(409, "Position doesn't exist");

    const findUser: User = await UserModel.findOne({ positionID: findPosition._id }).select('fullName');
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return { findPosition, findUser };
  }

  public async createPosition(positionData: Position): Promise<Position> {
    const findPosition: Position = await PositionModel.findOne({ name: positionData.name });
    if (findPosition) throw new HttpException(409, `This name ${positionData.name} already exists`);

    const findDepartment: Department = await DepartmentModel.findOne({ _id: positionData.departmentID });
    if (!findDepartment) throw new HttpException(409, "Department doesn't exist");

    const createPositionData: Position = await PositionModel.create(positionData);

    return createPositionData;
  }

  public async updatePosition(positionId: string, positionData: Position): Promise<Position> {
    if (positionData.name) {
      const findPosition: Position = await PositionModel.findOne({ name: positionData.name });
      if (findPosition && findPosition._id != positionId) throw new HttpException(409, `This name ${positionData.name} already exists`);
    }

    if (positionData.departmentID) {
      const findDepartment: Department = await DepartmentModel.findOne({ _id: positionData.departmentID });
      if (!findDepartment) throw new HttpException(409, "Department doesn't exist");
    }

    const updatePositionById: Position = await PositionModel.findByIdAndUpdate(positionId, { ...positionData }, { new: true });
    if (!updatePositionById) throw new HttpException(409, "Position doesn't exist");

    return updatePositionById;
  }

  public async deletePosition(positionId: string): Promise<Position> {
    const updatePositionById: Position = await PositionModel.findByIdAndUpdate(
      positionId,
      { isDelete: true },
      {
        new: true,
      },
    );
    if (!updatePositionById) throw new HttpException(409, "Position doesn't exist");

    return updatePositionById;
  }
}
