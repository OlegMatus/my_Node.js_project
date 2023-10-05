import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getOneByParams(params: FilterQuery<IUser>) {
    return await User.findOne(params);
  }
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }
  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }
  public async createUser(dto: IUser): Promise<any> {
    return await User.create(dto);
  }
}

export const userRepository = new UserRepository();
