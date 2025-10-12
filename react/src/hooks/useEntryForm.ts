import { useCallback, useMemo, useState } from "react";
import type { Employee, Role, ID } from "../types/staff";
import { validStaffService } from "../services/validStaffService";
import { employeeRepo } from "../repositories/employeeRepo";
import { roleRepo } from "../repositories/roleRepo";

export type EntryMode = "employee" | "role";
export type EmployeeFormState = Omit<Employee, "id">;
export type RoleFormState = Omit<Role, "id" | "isFilled">;
export type EntryFormErrors = Record<string, string>;

const EMPTY_EMP: EmployeeFormState = {
  firstName: "",
  lastName: "",
  roleId: undefined,
};
const EMPTY_ROLE: RoleFormState = { name: "", department: "" };

export function useEntryForm(
  mode: EntryMode,
  initial?: Partial<EmployeeFormState & RoleFormState>
) {
  const [values, setValues] = useState<EmployeeFormState | RoleFormState>(
    mode === "employee"
      ? { ...EMPTY_EMP, ...(initial ?? {}) }
      : { ...EMPTY_ROLE, ...(initial ?? {}) }
  );
  const [errors, setErrors] = useState<EntryFormErrors>({});
  const [roles, setRoles] = useState<Role[]>([]);

  const setValue = useCallback((field: string, value: string) => {
    setValues((prev) => ({ ...(prev as any), [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const reset = useCallback(() => {
    setValues(mode === "employee" ? { ...EMPTY_EMP } : { ...EMPTY_ROLE });
    setErrors({});
  }, [mode]);

  const refreshRoles = useCallback(async () => {
    setRoles(await roleRepo.list());
  }, []);

  const submit = useCallback(async () => {
    if (mode === "employee") {
      const input = values as EmployeeFormState;
      const res = await validStaffService.validateEmployee(input);
      if (!res.ok) {
        setErrors(res.errors);
        return { ok: false as const, errors: res.errors };
      }
      const created = await employeeRepo.create(res.value);
      if (created.roleId)
        await validStaffService.recalcRoleFilled(created.roleId);
      return { ok: true as const };
    }
    const input = values as RoleFormState;
    const res = await validStaffService.validateRole(input);
    if (!res.ok) {
      setErrors(res.errors);
      return { ok: false as const, errors: res.errors };
    }
    const created = await roleRepo.create({ ...res.value, isFilled: false });
    await roleRepo.update(created.id, { isFilled: false });
    return { ok: true as const };
  }, [mode, values]);

  return useMemo(
    () => ({
      mode,
      values,
      errors,
      setValue,
      reset,
      submit,
      roles,
      refreshRoles,
    }),
    [mode, values, errors, setValue, reset, submit, roles, refreshRoles]
  );
}
