document.addEventListener("DOMContentLoaded", () => {
  // Pehle URL se empId try karen
  const urlParams = new URLSearchParams(window.location.search);
  let empId = urlParams.get("empId");

  // Agar URL me empId nahi hai, localStorage se try kare
  if (!empId) {
    const stored = localStorage.getItem("selectedEmployee");
    if (stored) {
      const emp = JSON.parse(stored);
      fillEmployeeData(emp);
      return;
    } else {
      alert("Employee ID missing in URL!");
      return;
    }
  }

  fetchEmployeeData(empId);
});

function fetchEmployeeData(empId) {
  const scriptURL = CONFIG.SCRIPT_URL;

  // POST ke through fetch
  const params = new URLSearchParams({ action: "search", key: empId });

  fetch(scriptURL, { method: "POST", body: params })
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        alert("No data found for this employee!");
        return;
      }
      fillEmployeeData(data[0]);
    })
    .catch((err) => {
      console.error(err);
      alert("Error fetching data!");
    });
}

function fillEmployeeData(emp) {
  const fields = [
    "empId",
    "labourName",
    "fatherName",
    "gender",
    "dob",
    "mobile",
    "altMobile",
    "address",
    "city",
    "state",
    "pincode",
    "labourType",
    "department",
    "dailyWage",
    "workHours",
    "hourlyRate",
    "joiningDate",
    "contractor",
    "education",
    "primarySkill",
    "experience",
    "aadhaar",
    "pan",
    "pfApplicable",
    "pf",
    "esicApplicable",
    "esic",
    "bankName",
    "accountNumber",
    "ifsc",
    "accountHolder",
  ];

  fields.forEach((f) => {
    const el = document.getElementById(f);
    if (el && emp[f] !== undefined) el.value = emp[f];
  });

  // Make all fields read-only
  document
    .querySelectorAll(".sap-input, .sap-select, .sap-textarea")
    .forEach((input) => {
      input.setAttribute("readonly", true);
      input.setAttribute("disabled", true);
      input.style.background = "#F0F2F4";
      input.style.cursor = "not-allowed";
    });
}

function goBack() {
  window.location.href = "/viewEmp/"; // redirect to search page
}
