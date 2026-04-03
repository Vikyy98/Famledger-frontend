export interface AuthState {
  token: string | null;
  user: UserDetails | null;
}

export type RegistrationMode = "createFamily" | "joinFamily";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  registrationMode: RegistrationMode;
  /** Required when registrationMode is createFamily */
  familyName?: string;
  /** Required when registrationMode is joinFamily */
  invitationCode?: string;
}

export interface UserDetails {
  id: number;
  familyId?: number;
  name: string;
  email: string;
  familyName?: string | null;
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
