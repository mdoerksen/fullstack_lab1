document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  fetch("./data/employees.json")
    .then((res) => res.json())
    .then((data) => {
      const main = document.querySelector("main");
      const section = document.createElement("section");

      data.departments.forEach((dept) => {
        const card = document.createElement("div");
        card.className = "dept-card";

        const h4 = document.createElement("h4");
        h4.textContent = dept.name;
        card.appendChild(h4);

        const ul = document.createElement("ul");
        dept.employees.forEach((emp) => {
          const li = document.createElement("li");
          li.textContent = emp;
          ul.appendChild(li);
        });
        card.appendChild(ul);

        section.appendChild(card);
      });

      main.appendChild(section);
    });
});
