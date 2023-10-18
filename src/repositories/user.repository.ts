import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IQuery } from "../types/pagination.type";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async getAllWithPagination(query: IQuery): Promise<[IUser[], number]> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const {
      page = 1,
      limit = 5,
      sortedBy = "createdAt",
      ...searchObject
    } = queryObj;

    const skip = +limit * (+page - 1);

    return await Promise.all([
      User.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
      User.count(searchObject),
    ]);
  }
  public async getOneByParams(
    params: FilterQuery<IUser>,
    selection?: string[],
  ) {
    return await User.findOne(params, selection);
  }
  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async createUser(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }
  public async register(dto: IUserCredentials): Promise<IUser> {
    return await User.create(dto);
  }
  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }
  public async setStatus(userId: string, status: any): Promise<void> {
    await User.updateOne({ _id: userId }, { $set: { status } });
  }
  public async deleteUser(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepository();
