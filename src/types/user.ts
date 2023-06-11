// types for user
export default interface User {
  data: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    telegramHandle: string;
    country: string;
    shortBio: string;
    profilePicture: string;
    university: string;
    department: string;
    yearOfGraduation: string;
    leetcodeUsername: string;
    githubUsername: string;
    codeforcesUsername: string;
    hackerrankUsername: string;
    linkedinUrl: string;
    cv: File|null;
    programmingLanguage: string;
  };
}
