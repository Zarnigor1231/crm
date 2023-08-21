import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Outlay } from '@/interfaces/outlays.interface';
import { OutlayModel } from '@/models/outlays.model';

@Service()
export class OutlayService {
  public async findAllOutlay(): Promise<Outlay[]> {
    const outlays: Outlay[] = await OutlayModel.find().populate({ path: 'center', select: 'name' });
    return outlays;
  }

  public async findOutlayById(OutlayId: string): Promise<Outlay> {
    const findOutlay: Outlay = await OutlayModel.findOne({ _id: OutlayId }).populate({ path: 'center', select: 'name' });
    if (!findOutlay) throw new HttpException(409, "Outlay doesn't exist");

    return findOutlay;
  }

  public async createOutlay(OutlayData: Outlay): Promise<Outlay> {
    const createOutlayData: Outlay = await OutlayModel.create(OutlayData);

    return createOutlayData;
  }

  public async updateOutlay(OutlayId: string, OutlayData: Outlay): Promise<Outlay> {
    const updateOutlayById: Outlay = await OutlayModel.findByIdAndUpdate(OutlayId, { ...OutlayData }, { new: true });
    if (!updateOutlayById) throw new HttpException(409, "Outlay doesn't exist");

    return updateOutlayById;
  }
}
