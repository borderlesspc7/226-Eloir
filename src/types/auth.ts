export interface User {
  uid: string;
  email: string;
  displayName?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  displayName: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: AuthError;
}
