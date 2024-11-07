import { FunctionLike } from "./logging.helpers";

export const onClickStopPropagation =
  <T extends FunctionLike<TOut>, TOut = unknown>(callback: T) =>
  (...args: Parameters<T>) =>
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    return callback(...args);
  };