import { employeeRepo } from "../repositories/employeeRepo";
import { roleRepo } from "../repositories/roleRepo";
import type { Employee, Role, ID } from "../types/staff";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Record<string, string> };

const longEnough = (s: string) => s?.trim().length >= 3;

export const validStaffService = {
  async validateEmployee(
    input: Omit<Employee, "id">
  ): Promise<ValidationResult<Omit<Employee, "id">>> {
    const errors: Record<string, string> = {};
    if (!longEnough(input.firstName))
      errors.firstName = "First name must be at least 3 characters.";
    if (!longEnough(input.lastName))
      errors.lastName = "Last name must be at least 3 characters.";

    if (input.roleId) {
      const role = await roleRepo.getById(input.roleId);
      if (!role) errors.roleId = "Selected role does not exist.";
      else {
        const assigned = await employeeRepo.listByRole(role.id);
        if (assigned.length >= 1)
          errors.roleId = `The role "${role.name}" is already filled.`;
      }
    }

    return Object.keys(errors).length
      ? { ok: false, errors }
      : {
          ok: true,
          value: {
            ...input,
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
          },
        };
  },

  async validateRole(
    input: Omit<Role, "id" | "isFilled">
  ): Promise<ValidationResult<Omit<Role, "id" | "isFilled">>> {
    const errors: Record<string, string> = {};
    if (!longEnough(input.name))
      errors.name = "Role name must be at least 3 characters.";
    if (!longEnough(input.department))
      errors.department = "Department must be at least 3 characters.";

    const existing = await roleRepo.findByNameAndDept(
      input.name,
      input.department
    );
    if (existing && existing.isFilled) {
      errors.name = `A filled role named "${existing.name}" in ${existing.department} already exists.`;
    }

    return Object.keys(errors).length
      ? { ok: false, errors }
      : {
          ok: true,
          value: {
            name: input.name.trim(),
            department: input.department.trim(),
          },
        };
  },

  async recalcRoleFilled(roleId: ID) {
    const assigned = await employeeRepo.listByRole(roleId);
    await roleRepo.update(roleId, { isFilled: assigned.length >= 1 });
  },
};
