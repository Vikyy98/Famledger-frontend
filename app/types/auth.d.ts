export interface AuthState {
  token: string | null;
  user: UserDetails | null;
}

export interface RegisterRequest {
  fullName: string;
  familyName?: string;
  email: string;
  password: string;
  role?: "User" | "Admin";
}

export interface UserDetails {
  userId: number;
  familyId: number;
  name: string;
  email: string;
  familyName: string;
  role: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserDetails;
}
