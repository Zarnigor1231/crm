import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Check } from '@/interfaces/checks.interface';
import { CheckModel } from '@/models/checks.model';

@Service()
export class CheckService {
  public async findAllCheck(): Promise<Check[]> {
    const checks: Check[] = await CheckModel.find().populate({ path: 'center', select: 'name' });
    return checks;
  }

  public async findCheckById(checkId: string): Promise<Check> {
    const findCheck: Check = await CheckModel.findOne({ _id: checkId }).populate({ path: 'center', select: 'name' });
    if (!findCheck) throw new HttpException(409, "Check doesn't exist");

    return findCheck;
  }

  public async createCheck(checkData: Check): Promise<Check> {
    const createCheckData: Check = await CheckModel.create(checkData);

    return createCheckData;
  }

  public async updateCheck(checkId: string, checkData: Check): Promise<Check> {
    const updateCheckById: Check = await CheckModel.findByIdAndUpdate(checkId, { ...checkData }, { new: true });
    if (!updateCheckById) throw new HttpException(409, "Check doesn't exist");

    return updateCheckById;
  }
}
