export const user_role = {
  customer: 'customer',
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof user_role;
