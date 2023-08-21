import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Department } from '@/interfaces/departments.interface';
import { DepartmentModel } from '@/models/departments.model';
import { Center } from '@/interfaces/centers.interface';
import { CenterModel } from '@/models/centers.model';
import { Direction } from 'readline';
import { DirectionModel } from '@/models/directions.model';
import { Position } from '@/interfaces/positions.interface';
import { PositionModel } from '@/models/positions.model';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.model';

@Service()
export class DepartmentService {
  public async findAllDepartment(positionNameOrDirectionsName) {
    const names = {
      position: positionNameOrDirectionsName.position,
      direction: positionNameOrDirectionsName.direction,
    };

    let data: any;

    if (names.position) {
      data = await PositionModel.findOne({ name: names.position }).select('name');
      if (!data) throw new HttpException(409, "Position doesn't exist");
    }

    if (names.direction) {
      data = await DirectionModel.findOne({ name: names.direction }).select('name');
      if (!data) throw new HttpException(409, "Direction doesn't exist");
    }

    const findUser: User = await UserModel.findOne({ positionID: data._id }).select('fullName');
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return { data, findUser };
  }

  public async findDepartmentById(departmentId: string): Promise<String[]> {
    const department = [];
    const findDirection: Direction = await DirectionModel.findOne({ department: departmentId });
    if (!findDirection) throw new HttpException(409, "Direction doesn't exist");

    const findPosition: Position = await PositionModel.findOne({ departmentID: departmentId });
    if (!findPosition) throw new HttpException(409, "Position doesn't exist");

    department.push({ direction: findDirection, position: findPosition });

    return department;
  }

  public async createDepartment(departmentData: Department): Promise<Department> {
    const findDepartment: Department = await DepartmentModel.findOne({ name: departmentData.name });
    if (findDepartment) throw new HttpException(409, `This name ${departmentData.name} already exists`);

    const findCenter: Center = await CenterModel.findOne({ _id: departmentData.center });
    if (!findCenter) throw new HttpException(409, "Center doesn't exist");

    const createDepartmentData: Department = await DepartmentModel.create(departmentData);

    return createDepartmentData;
  }

  public async updateDepartment(departmentId: string, departmentData: Department): Promise<Department> {
    if (departmentData.name) {
      const findDepartment: Department = await DepartmentModel.findOne({ name: departmentData.name });
      if (findDepartment && findDepartment._id != departmentId) throw new HttpException(409, `This name ${departmentData.name} already exists`);
    }

    if (departmentData.center) {
      const findCenter: Center = await CenterModel.findOne({ _id: departmentData.center });
      if (!findCenter) throw new HttpException(409, "Center doesn't exist");
    }

    const updateDepartmentById: Department = await DepartmentModel.findByIdAndUpdate(departmentId, { ...departmentData }, { new: true });
    if (!updateDepartmentById) throw new HttpException(409, "Department doesn't exist");

    return updateDepartmentById;
  }

  public async deleteDepartment(departmentId: string): Promise<Department> {
    const updateDepartmentById: Department = await DepartmentModel.findByIdAndUpdate(
      departmentId,
      { isDelete: true },
      {
        new: true,
      },
    );
    if (!updateDepartmentById) throw new HttpException(409, "Department doesn't exist");

    return updateDepartmentById;
  }
}
