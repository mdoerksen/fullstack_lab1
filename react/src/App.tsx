import Nav from "./components/Nav";
import Footer from "./components/Footer";
import EmployeeDirectory from "./components/EmployeeDirectory";

export default function App() {
  return (
    <>
      <Nav />
      <header>
        <h1>Pixell River Financial</h1>
        <p>Indigenous owned. Community focused. Future Driven.</p>
      </header>
      <main>
        <h2>Employee Directory</h2>
        <EmployeeDirectory />
      </main>
      <Footer />
    </>
  );
}
