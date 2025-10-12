export type ID = string;

export type Role = {
  id: ID;
  name: string; // e.g., "Developer"
  department: string; // e.g., "IT"
  isFilled: boolean; // true if an employee holds this role
};

export type Employee = {
  id: ID;
  firstName: string;
  lastName: string;
  roleId?: ID | null;
};
