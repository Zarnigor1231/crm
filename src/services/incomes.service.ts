import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Income } from '@/interfaces/incomes.interface';
import { IncomesModel } from '@/models/incomes.model';

@Service()
export class IncomeService {
  public async findAllIncome(): Promise<Income[]> {
    const incomes: Income[] = await IncomesModel.find().populate({ path: 'center', select: 'name' });
    return incomes;
  }

  public async findIncomeById(incomeId: string): Promise<Income> {
    const findIncome: Income = await IncomesModel.findOne({ _id: incomeId }).populate({ path: 'center', select: 'name' });
    if (!findIncome) throw new HttpException(409, "Income doesn't exist");

    return findIncome;
  }

  public async createIncome(incomeData: Income): Promise<Income> {
    const createIncomeData: Income = await IncomesModel.create(incomeData);

    return createIncomeData;
  }

  public async updateIncome(incomeId: string, incomeData: Income): Promise<Income> {
    const updateIncomeById: Income = await IncomesModel.findByIdAndUpdate(incomeId, { ...incomeData }, { new: true });
    if (!updateIncomeById) throw new HttpException(409, "Income doesn't exist");

    return updateIncomeById;
  }
}
