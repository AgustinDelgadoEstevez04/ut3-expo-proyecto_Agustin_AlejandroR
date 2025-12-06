export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface UserSession {
  user: User;
  token?: string;
  expiresAt?: string;
}