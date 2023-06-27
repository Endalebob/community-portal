export default interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  profilePicture: string | null;
  fullName: string | null;
  role: string | null; 
  email: string | null;
}