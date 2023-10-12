import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
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
