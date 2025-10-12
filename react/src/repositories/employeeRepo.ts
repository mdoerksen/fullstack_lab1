import { Employee, ID } from "../types/staff";

let employees: Employee[] = [];

export const employeeRepo = {
  async list(): Promise<Employee[]> {
    return [...employees];
  },
  async getById(id: ID): Promise<Employee | undefined> {
    return employees.find((e) => e.id === id);
  },
  async listByRole(roleId: ID): Promise<Employee[]> {
    return employees.filter((e) => e.roleId === roleId);
  },
  async create(input: Omit<Employee, "id">): Promise<Employee> {
    const e: Employee = { id: crypto.randomUUID(), ...input };
    employees = [e, ...employees];
    return e;
  },
  async update(
    id: ID,
    patch: Partial<Omit<Employee, "id">>
  ): Promise<Employee | undefined> {
    let updated: Employee | undefined;
    employees = employees.map((e) =>
      e.id === id ? (updated = { ...e, ...patch })! : e
    );
    return updated;
  },
  async remove(id: ID): Promise<void> {
    employees = employees.filter((e) => e.id !== id);
  },
  __reset(seed: Employee[]) {
    employees = seed;
  },
};
