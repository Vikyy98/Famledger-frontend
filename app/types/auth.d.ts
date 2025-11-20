export interface RegisterRequest {
  fullName: string;
  familyName?: string;
  email: string;
  password: string;
  role?: "User" | "Admin";
}
export interface UserDetails {
  userId: number;
  email: string;
  name: string;
  familyName: string;
  Role: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserDetails;
}

export interface FamilyRequest {
  userId: number | undefined;
  familyName: string;
  invitationLink: string;
  familyDetailType: number;
}

export interface AuthState {
  token: string | null;
  user: UserDetails | null;
}
