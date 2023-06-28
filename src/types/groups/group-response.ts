import { Group } from "./get-group";

export interface GroupsResponse {
  isSuccess: boolean;
  error: null;
  value: Group[];
  message: null;
}
