export interface LoggedInUser {
  id: string | number;
  email: string;
  isActive: boolean;
  fullName: string;
  roles: [
    {
      id: string | number;
      name: string;
    }
  ];
}

export interface UserOnCreate {
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface Role {
  id: number;
  code: string;
  name: string;
  description?: string | null;
}