
// API response types for the EmerG application

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// API endpoint types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface CreatePatientRequest {
  name: string;
  age: number;
  symptoms: string;
  triage: 1 | 2 | 3 | 4 | 5;
  department: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  department: string;
  dueDate?: string;
}

export interface UpdateBedRequest {
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  patientId?: string;
}

import type { User, Patient, Bed, Task, Ambulance, Department } from './index';
