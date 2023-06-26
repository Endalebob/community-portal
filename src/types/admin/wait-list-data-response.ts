import { WaitListItem } from "./wait-list-item";

export interface WaitlistData {
    isSuccess: boolean;
    error: Error; 
    value: {
      items: WaitListItem[];
      totalCount: number;
    };
    message: Error;
  }
  