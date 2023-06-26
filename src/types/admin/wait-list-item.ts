export interface WaitListItem {
  userId: string;
  fullName: string;
  profilePhotoUrl?: string | null;
  waitlistCreationDate?: Date | string;
  telegramUsername?: string;
}
