type UserRole = "admin" | "user";

export default interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null; // Add role property
}