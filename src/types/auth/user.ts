
export default interface User {
  data: {
    AppUserId: number;
    Email: string;
    FullName: string;
    ProfilePicture: string;
    PhoneNumber: string;
    TelegramUsername: string;
    Country: string;
    ShortBio: string;
    University: string;
    Department: string;
    GraduationYear: string;
    LeetCode: string;
    GitHub: string;
    Codeforces: string;
    Hackerrank: string;
    LinkedIn: string;
    Cv: File|null;
    FavoriteLanguage: string;
    GroupId: number;
  };
}
