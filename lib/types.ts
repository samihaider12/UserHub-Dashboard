export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
}

export interface UserWithMeta extends User {
  role: string;
  status: "active" | "inactive";
}

export interface UsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
}

export interface CreateUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdateUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsers: number;
}
