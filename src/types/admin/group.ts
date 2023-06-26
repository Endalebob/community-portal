import User from "../auth/user";

export interface Group {
    id: number;
    name: string;
    capacity: number;
    membersCount: number;
    telegramLink: string;
    divisionId: number;
    members: User[]; 
  }
  
