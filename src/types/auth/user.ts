
// interface Filee {
//   url: string|File;
//   type: string;
//   publicId: string;
// }


export default interface User {
  appUserId: string;
  email: string;
  fullName: string;
  // profilePicture: Filee;
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
  // cv: Filee;
  cv: string|File;
  cvLink: string;
  favoriteLanguage: string;
  groupId: number;
}
