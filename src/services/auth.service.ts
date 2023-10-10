import { EActionTokenType } from "../enums/activationTokenType.enum";
import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.types";
import { IUser, IUserCredentials } from "../types/user.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(dto.password);
      const user = await userRepository.register({
        ...dto,
        password: hashedPassword,
      });

      const actionToken = tokenService.generateActionToken({
        userId: user._id,
        name: user.name,
      });
      await actionTokenRepository.create({
        token: actionToken,
        type: EActionTokenType.activate,
        _userId: user._id,
      });
      await emailService.sendMail(
        "netflix.murch2023@gmail.com",
        EEmailAction.REGISTER,
        { name: dto.name, actionToken },
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(dto: IUserCredentials): Promise<ITokensPair> {
    try {
      const user = await userRepository.getOneByParams({ email: dto.email });
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const isMatched = await passwordService.compare(
        dto.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }
      const tokensPair = await tokenService.generateTokenPair({
        userId: user._id,
        name: user.name,
      });
      await tokenRepository.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    try {
      const tokensPair = await tokenService.generateTokenPair(payload);

      await Promise.all([
        tokenRepository.create({ ...tokensPair, _userId: payload.userId }),
        tokenRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
