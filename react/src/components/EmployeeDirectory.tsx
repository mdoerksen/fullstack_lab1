import data from "../data/employees.json";

export default function EmployeeDirectory() {
  return (
    <section>
      {data.departments.map((dept: any, i: number) => (
        <div key={i} className="dept-card">
          <h4>{dept.name}</h4>
          <ul>
            {dept.employees.map((emp: string, j: number) => (
              <li key={j}>{emp}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
