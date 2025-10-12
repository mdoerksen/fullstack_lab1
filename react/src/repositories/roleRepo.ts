import { Role, ID } from "../types/staff";

let roles: Role[] = [
  {
    id: crypto.randomUUID(),
    name: "Developer",
    department: "IT",
    isFilled: false,
  },
  {
    id: crypto.randomUUID(),
    name: "Designer",
    department: "Product",
    isFilled: false,
  },
];

export const roleRepo = {
  async list(): Promise<Role[]> {
    return [...roles];
  },
  async getById(id: ID): Promise<Role | undefined> {
    return roles.find((r) => r.id === id);
  },
  async findByNameAndDept(
    name: string,
    department: string
  ): Promise<Role | undefined> {
    const norm = (s: string) => s.trim().toLowerCase();
    return roles.find(
      (r) =>
        norm(r.name) === norm(name) && norm(r.department) === norm(department)
    );
  },
  async create(
    input: Omit<Role, "id" | "isFilled"> & Partial<Pick<Role, "isFilled">>
  ): Promise<Role> {
    const role: Role = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      department: input.department.trim(),
      isFilled: Boolean(input.isFilled),
    };
    roles = [role, ...roles];
    return role;
  },
  async update(
    id: ID,
    patch: Partial<Omit<Role, "id">>
  ): Promise<Role | undefined> {
    let updated: Role | undefined;
    roles = roles.map((r) =>
      r.id === id ? (updated = { ...r, ...patch })! : r
    );
    return updated;
  },
  async remove(id: ID): Promise<void> {
    roles = roles.filter((r) => r.id !== id);
  },
  __reset(seed: Role[]) {
    roles = seed;
  },
};
