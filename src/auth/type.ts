export interface RegisterRequest {
  fullName: string;
  familyName: string;
  email: string;
  password: string;
  role: "User" | "Admin";
}
