// type for signup
// signup form has fiels: name, email, phoneNumber, telegramHandle, password, password2

export default interface SignupType {
  fullName: string;
  email: string;
  phoneNumber: string;
  codeforces: string;
  telegram: string;
  password: string;
  confirmPassword: string;
}
