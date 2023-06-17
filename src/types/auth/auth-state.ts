export default interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  role: string | null; // Add role property
}