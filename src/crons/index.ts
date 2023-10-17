import { removeOldTokens } from "./remove-old-tokens";

export const cronRunner = () => {
  removeOldTokens.start();
};
