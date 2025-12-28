document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("studentForm");
  const tableBody = document.getElementById("tableBody");
  const successMsg = document.getElementById("successMsg");

  // INPUT FIELDS
  const nameInput = document.getElementById("name");
  const age = document.getElementById("age");
  const gender = document.getElementById("gender");
  const state = document.getElementById("state");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  // TAB SYSTEM
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // LOAD STORED DATA
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach(addRow);

  // FORM SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
      name: nameInput.value.trim(),
      age: age.value,
      gender: gender.value,
      state: state.value.trim(),
      address: address.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim()
    };

    if (!validate(student)) return;

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    addRow(student);

    successMsg.textContent = "Student registered successfully ✅";
    form.reset();

    setTimeout(() => {
      successMsg.textContent = "";
    }, 3000);
  });

  // VALIDATION FUNCTION
  function validate(s) {
    if (
      !s.name ||
      !s.age ||
      !s.gender ||
      !s.state ||
      !s.address ||
      !s.email ||
      !s.phone
    ) {
      alert("All fields are required");
      return false;
    }

    if (!/^\d{10}$/.test(s.phone)) {
      alert("Phone number must be 10 digits");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(s.email)) {
      alert("Enter a valid email address");
      return false;
    }

    return true;
  }

  // ADD ROW TO TABLE
  function addRow(student) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.gender}</td>
      <td>${student.state}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.address}</td>
    `;

    tableBody.appendChild(row);
  }

});
