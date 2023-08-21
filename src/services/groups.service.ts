import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Group } from '@/interfaces/groups.interface';
import { GroupModel } from '@/models/groups.model';
import { Direction } from '@/interfaces/directions.interface';
import { DirectionModel } from '@/models/directions.model';

@Service()
export class GroupService {
  public async findAllGroup(): Promise<Group[]> {
    const groups: Group[] = await GroupModel.find().populate({ path: 'center', select: 'name' });
    return groups;
  }

  public async findGroupById(GroupId: string): Promise<Group> {
    const findGroup: Group = await GroupModel.findOne({ _id: GroupId }).populate({ path: 'center', select: 'name' });
    if (!findGroup || findGroup.isDelete === true) throw new HttpException(409, "Group doesn't exist");

    return findGroup;
  }

  public async createGroup(GroupData: Group): Promise<Group> {
    const findGroup: Group = await GroupModel.findOne({ group_number: GroupData.group_number });
    if (findGroup) throw new HttpException(409, `This group_number ${GroupData.group_number} already exists`);

    const findDirection: Direction = await DirectionModel.findOne({ _id: GroupData.direction });
    if (!findDirection) throw new HttpException(409, "Direction doesn't exist");

    const createGroupData: Group = await GroupModel.create(GroupData);

    return createGroupData;
  }

  public async updateGroup(GroupId: string, GroupData: Group): Promise<Group> {
    if (GroupData.group_number) {
      const findGroup: Group = await GroupModel.findOne({ group_number: GroupData.group_number });
      if (findGroup && findGroup._id != GroupId) throw new HttpException(409, `This group_number ${GroupData.group_number} already exists`);
    }

    if (GroupData.direction) {
      const findDirection: Direction = await DirectionModel.findOne({ _id: GroupData.direction });
      if (!findDirection) throw new HttpException(409, "Direction doesn't exist");
    }

    const updateGroupById: Group = await GroupModel.findByIdAndUpdate(GroupId, { ...GroupData }, { new: true });
    if (!updateGroupById) throw new HttpException(409, "Group doesn't exist");

    return updateGroupById;
  }

  public async deleteGroup(GroupId: string): Promise<Group> {
    const updateGroupById: Group = await GroupModel.findByIdAndUpdate(
      GroupId,
      { isDelete: true },
      {
        new: true,
      },
    );
    if (!updateGroupById) throw new HttpException(409, "Group doesn't exist");

    return updateGroupById;
  }
}
