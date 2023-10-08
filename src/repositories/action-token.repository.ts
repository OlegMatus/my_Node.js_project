import { FilterQuery } from "mongoose";

import { ActionToken } from "../models/ActionToken.model";
import { IActionToken } from "../types/token.types";

class ActionTokenRepository {
  public async create(dto: IActionToken): Promise<IActionToken> {
    return await ActionToken.create(dto);
  }
  public async findOne(
    params: FilterQuery<IActionToken>,
  ): Promise<IActionToken> {
    return await ActionToken.findOne(params);
  }
  public async deleteOne(params: FilterQuery<IActionToken>): Promise<void> {
    await ActionToken.deleteOne(params);
  }
  public async deleteManyByUserId(userId: string): Promise<void> {
    await ActionToken.deleteMany({ _userId: userId });
  }
}

export const actionTokenRepository = new ActionTokenRepository();
