export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'steward' | 'engineer' | 'viewer';
  organization: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
