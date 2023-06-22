export default interface User {
  appUserId: string;
  email: string;
  fullName: string;
  profilePicture: string;
  phoneNumber: string;
  telegramUsername: string;
  country: string;
  shortBio: string;
  university: string;
  department: string;
  graduationYear: string;
  leetCode: string;
  gitHub: string;
  codeforces: string;
  hackerrank: string;
  linkedIn: string;
  cv: File | null;
  cvLink: string;
  favoriteLanguage: string;
  groupId: number;
}
