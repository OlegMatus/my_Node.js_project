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
  public async updateUser(
    manageUserId: string,
    dto: Partial<IUser>,
    userId: string,
  ): Promise<IUser> {
    this.checkAbilityToManage(userId, manageUserId);
    return await userRepository.updateOneById(manageUserId, dto);
  }
  public async deleteUser(userId: string): Promise<void> {
    return await userRepository.deleteUser(userId);
  }
  private async isEmailUniq(email: string): Promise<void> {
    const user = await userRepository.getOneByParams({ email });
    if (user) {
      throw new ApiError("Email already exist", 409);
    }
  }
  public async getMe(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  private checkAbilityToManage(userId: string, manageUserId: string): void {
    if (userId !== manageUserId) {
      throw new ApiError("U can not manage this user", 403);
    }
  }
}

export const userService = new UserService();
