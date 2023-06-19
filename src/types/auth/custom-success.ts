import User from "./user";

export default interface CustomSuccess {
    data:{
    isSuccess: boolean;
    error: null;
    value: User;
    message: null;}
  }