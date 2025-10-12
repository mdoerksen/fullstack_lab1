import { useEffect, useState } from "react";
import { useEntryForm } from "../../hooks/useEntryForm";
import { roleRepo } from "../../repositories/roleRepo";
import type { Role } from "../../types/staff";

export default function RolesPage() {
  const { values, errors, setValue, submit, reset } = useEntryForm("role");
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    roleRepo.list().then(setRoles);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await submit();
    if (res.ok) {
      reset();
      setRoles(await roleRepo.list());
    }
  };

  return (
    <div className="stack">
      <form onSubmit={onSubmit} className="stack">
        <div>
          <label>Role Name</label>
          <input
            value={(values as any).name || ""}
            onChange={(e) => setValue("name", e.target.value)}
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>
        <div>
          <label>Department</label>
          <input
            value={(values as any).department || ""}
            onChange={(e) => setValue("department", e.target.value)}
          />
          {errors.department && (
            <small className="error">{errors.department}</small>
          )}
        </div>
        <button type="submit">Create Role</button>
      </form>

      <section>
        <h3>Current Roles</h3>
        {roles.length === 0 ? (
          <p>No roles yet.</p>
        ) : (
          <ul>
            {roles.map((r) => (
              <li key={r.id}>
                {r.name} · {r.department} {r.isFilled ? "(filled)" : "(open)"}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
