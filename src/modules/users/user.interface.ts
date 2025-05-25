export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin';
  isActive: boolean;
};
