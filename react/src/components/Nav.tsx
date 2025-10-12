export default function Nav({
  active,
  onNavigate,
}: {
  active: "directory" | "employees" | "organization";
  onNavigate: (tab: "directory" | "employees" | "organization") => void;
}) {
  const Tab = ({ id, label }: { id: typeof active; label: string }) => (
    <button
      className={`tab ${active === id ? "active" : ""}`}
      onClick={() => onNavigate(id)}
    >
      {label}
    </button>
  );

  return (
    <nav className="app-nav">
      <Tab id="directory" label="Directory" />
      <Tab id="employees" label="Employees" />
      <Tab id="organization" label="Organization" />
    </nav>
  );
}
