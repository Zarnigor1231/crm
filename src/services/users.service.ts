import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

@Service()
export class UserService {
  public async findAllUser(): Promise<User> {
    const users: User[] = await UserModel.find();
    if (users[0].isDelete === true) {
      throw new HttpException(409, "User doesn't exist");
    }
    return users[0];
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await UserModel.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const createUserData: User = await UserModel.create(userData);

    return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (userData.email) {
      const findUser: User = await UserModel.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    const updateUserById: User = await UserModel.findByIdAndUpdate(userId, { userData }, { new: true });
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const updateUserById: User = await UserModel.findByIdAndUpdate(
      userId,
      { isDelete: true },
      {
        new: true,
      },
    );
    if (!updateUserById) throw new HttpException(409, "User doesn't exist");

    return updateUserById;
  }
}
