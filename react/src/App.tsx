import { useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import EmployeeDirectory from "./components/EmployeeDirectory";
import EmployeesPage from "./components/pages/EmployeesPage";
import RolesPage from "./components/pages/RolesPage";

export default function App() {
  const [tab, setTab] = useState<"directory" | "employees" | "organization">(
    "directory"
  );

  return (
    <>
      <Nav active={tab} onNavigate={setTab} />

      <header style={{ textAlign: "center", padding: "24px 0" }}>
        <h1>Pixell River Financial</h1>
        <p>Indigenous owned. Community focused. Future Driven.</p>
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 16px 48px" }}>
        {tab === "directory" && (
          <section>
            <h2>Employee Directory</h2>
            <EmployeeDirectory />
          </section>
        )}

        {tab === "employees" && (
          <section>
            <h2>Employees</h2>
            <EmployeesPage />
          </section>
        )}

        {tab === "organization" && (
          <section>
            <h2>Organization (Roles)</h2>
            <RolesPage />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
