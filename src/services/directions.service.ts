import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { DirectionModel } from '@/models/directions.model';
import { Direction } from '@/interfaces/directions.interface';
import { Department } from '@/interfaces/departments.interface';
import { DepartmentModel } from '@/models/departments.model';
import { Group } from '@/interfaces/groups.interface';
import { GroupModel } from '@/models/groups.model';

@Service()
export class DirectionService {
  public async findAllDirection(): Promise<Direction[]> {
    const Directions: Direction[] = await DirectionModel.find().populate({ path: 'department', select: 'name' });
    return Directions;
  }

  public async findDirectionById(departmentId: string) {
    console.log(departmentId, 12);
    const findDirection: Direction = await DirectionModel.findOne({ department: new Object(departmentId) })
      .populate({
        path: 'department',
        select: 'name',
      })
      .select({ name: 1, department: 1 });
    if (!findDirection) throw new HttpException(409, "Direction doesn't exist");

    const findGroup: Group = await GroupModel.findOne({ direction: findDirection._id });
    if (!findGroup) throw new HttpException(409, "Group doesn't exist");

    const data = { findDirection, group: findGroup };

    return data;
  }

  public async createDirection(DirectionData: Direction): Promise<Direction> {
    const findDirection: Direction = await DirectionModel.findOne({ name: DirectionData.name });
    if (findDirection) throw new HttpException(409, `This name ${DirectionData.name} already exists`);

    const findDepartment: Department = await DepartmentModel.findOne({ _id: DirectionData.department });
    if (!findDepartment) throw new HttpException(409, "Department doesn't exist");

    const createDirectionData: Direction = await DirectionModel.create(DirectionData);

    return createDirectionData;
  }

  public async updateDirection(DirectionId: string, DirectionData: Direction): Promise<Direction> {
    if (DirectionData.name) {
      const findDirection: Direction = await DirectionModel.findOne({ name: DirectionData.name });
      if (findDirection && findDirection._id != DirectionId) throw new HttpException(409, `This name ${DirectionData.name} already exists`);
    }

    if (DirectionData.department) {
      const findDepartment: Department = await DepartmentModel.findOne({ _id: DirectionData.department });
      if (!findDepartment) throw new HttpException(409, "Department doesn't exist");
    }

    const updateDirectionById: Direction = await DirectionModel.findByIdAndUpdate(DirectionId, { ...DirectionData }, { new: true });
    if (!updateDirectionById) throw new HttpException(409, "Direction doesn't exist");

    return updateDirectionById;
  }

  public async deleteDirection(DirectionId: string): Promise<Direction> {
    const updateDirectionById: Direction = await DirectionModel.findByIdAndUpdate(
      DirectionId,
      { isDelete: true },
      {
        new: true,
      },
    );
    if (!updateDirectionById) throw new HttpException(409, "Direction doesn't exist");

    return updateDirectionById;
  }
}
