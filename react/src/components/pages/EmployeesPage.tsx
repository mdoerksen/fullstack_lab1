import { useEffect, useState, type FormEvent } from "react";
import { useEntryForm } from "../../hooks/useEntryForm";
import { employeeRepo } from "../../repositories/employeeRepo";
import type { Employee, Role } from "../../types/staff";

export default function EmployeesPage() {
  const { values, errors, setValue, submit, reset, roles, refreshRoles } =
    useEntryForm("employee");
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    refreshRoles();
    employeeRepo.list().then(setEmployees);
  }, [refreshRoles]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res.ok) {
      reset();
      await refreshRoles();
      setEmployees(await employeeRepo.list());
    }
  };

  return (
    <div className="stack">
      <form onSubmit={onSubmit} className="stack">
        <div>
          <label>First Name</label>
          <input
            value={(values as any).firstName || ""}
            onChange={(e) => setValue("firstName", e.target.value)}
          />
          {errors.firstName && (
            <small className="error">{errors.firstName}</small>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            value={(values as any).lastName || ""}
            onChange={(e) => setValue("lastName", e.target.value)}
          />
          {errors.lastName && (
            <small className="error">{errors.lastName}</small>
          )}
        </div>

        <div>
          <label>Role (optional)</label>
          <select
            value={(values as any).roleId ?? ""}
            onChange={(e) =>
              setValue("roleId", (e.target.value || undefined) as any)
            }
          >
            <option value="">— Unassigned —</option>
            {roles.map((r: Role) => (
              <option key={r.id} value={r.id} disabled={r.isFilled}>
                {r.name} · {r.department} {r.isFilled ? "(filled)" : ""}
              </option>
            ))}
          </select>
          {errors.roleId && <small className="error">{errors.roleId}</small>}
        </div>

        <button type="submit">Add Employee</button>
      </form>

      <section>
        <h3>Current Employees</h3>
        {employees.length === 0 ? (
          <p>No employees yet.</p>
        ) : (
          <ul>
            {employees.map((e) => {
              const role = roles.find((r) => r.id === e.roleId);
              return (
                <li key={e.id}>
                  {e.firstName} {e.lastName} —{" "}
                  {role ? `${role.name} (${role.department})` : "Unassigned"}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
