export type UserRole = 'student' | 'teacher' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: UserRole;
  student_id?: string;
  employee_id?: string;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}
