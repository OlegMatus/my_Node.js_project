import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }
  public async createUser(dto: IUser): Promise<IUser> {
    await this.isEmailUniq(dto.email);
    return await userRepository.createUser(dto);
  }
  private async isEmailUniq(email: string): Promise<void> {
    const user = await userRepository.getOneByParams({ email });
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }
}

export const userService = new UserService();
