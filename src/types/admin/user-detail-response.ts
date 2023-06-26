import User from "../auth/user";

export interface UserDetailData {
    isSuccess: boolean;
    error: Error;
    value: User;
    message: Error;
  }