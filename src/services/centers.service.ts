import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Center } from '@/interfaces/centers.interface';
import { CenterModel } from '@/models/centers.model';

@Service()
export class CenterService {
  public async findAllCenter(): Promise<Center[]> {
    const centers: Center[] = await CenterModel.find();
    return centers;
  }

  public async findCenterById(centerId: string): Promise<Center> {
    const findCenter: Center = await CenterModel.findOne({ _id: centerId });
    if (!findCenter) throw new HttpException(409, "Center doesn't exist");

    return findCenter;
  }

  public async createCenter(centerData: Center): Promise<Center> {
    const findCenter: Center = await CenterModel.findOne({ name: centerData.name });
    if (findCenter) throw new HttpException(409, `This name ${centerData.name} already exists`);

    const createCenterData: Center = await CenterModel.create(centerData);

    return createCenterData;
  }

  public async updateCenter(centerId: string, centerData: Center): Promise<Center> {
    if (centerData.name) {
      const findCenter: Center = await CenterModel.findOne({ name: centerData.name });
      if (findCenter && findCenter._id != centerId) throw new HttpException(409, `This name ${centerData.name} already exists`);
    }

    const updateCenterById: Center = await CenterModel.findByIdAndUpdate(new Object(centerId), { ...centerData }, { new: true });
    if (!updateCenterById) throw new HttpException(409, "Center doesn't exist");

    console.log(updateCenterById);

    return updateCenterById;
  }

  public async deleteCenter(centerId: string): Promise<Center> {
    const updateCenterById: Center = await CenterModel.findByIdAndUpdate(
      centerId,
      { isDelete: true },
      {
        new: true,
      },
    );
    if (!updateCenterById) throw new HttpException(409, "Center doesn't exist");

    return updateCenterById;
  }
}
