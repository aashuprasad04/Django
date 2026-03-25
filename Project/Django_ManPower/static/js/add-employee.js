document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveEmployee");
  const empIdInput = document.getElementById("empId");
  const loading = document.getElementById("loadingOverlay");

  const dailyWageInput = document.getElementById("dailyWage");
  const workHoursInput = document.getElementById("workHours");
  const hourlyRateInput = document.getElementById("hourlyRate");

  const pfCheckbox = document.getElementById("pfApplicable");
  const esicCheckbox = document.getElementById("esicApplicable");

  const pfInput = document.getElementById("pf");
  const esicInput = document.getElementById("esic");

  const aadhaarInput = document.getElementById("aadhaar");

  aadhaarInput.addEventListener("input", () => {
    let v = aadhaarInput.value.replace(/\D/g, "");

    if (v.length > 12) v = v.slice(0, 12);

    aadhaarInput.value = v.replace(/(\d{4})(?=\d)/g, "$1 ");
  });

  const panInput = document.getElementById("pan");

  panInput.addEventListener("input", () => {
    let v = panInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // max 10 chars
    if (v.length > 10) v = v.slice(0, 10);

    // enforce AAAAA9999A
    let formatted = "";

    for (let i = 0; i < v.length; i++) {
      if (i < 5 && /[A-Z]/.test(v[i])) formatted += v[i];
      else if (i >= 5 && i < 9 && /\d/.test(v[i])) formatted += v[i];
      else if (i === 9 && /[A-Z]/.test(v[i])) formatted += v[i];
    }

    panInput.value = formatted;
  });

  // ===== PF CHECKBOX LOGIC =====
  pfCheckbox.addEventListener("change", () => {
    if (pfCheckbox.checked) {
      pfInput.disabled = false;
      pfInput.focus();
    } else {
      pfInput.value = "";
      pfInput.disabled = true;
    }
  });

  // ===== ESIC CHECKBOX LOGIC =====
  esicCheckbox.addEventListener("change", () => {
    if (esicCheckbox.checked) {
      esicInput.disabled = false;
      esicInput.focus();
    } else {
      esicInput.value = "";
      esicInput.disabled = true;
    }
  });

  const scriptURL = CONFIG.SCRIPT_URL;

  document.getElementById("exportBtn").addEventListener("click", () => {
    window.open(
      scriptURL +
        "?action=exportExcel&token=" +
        sessionStorage.getItem("token"),
      "_blank"
    );
  });

  // ===== TOKEN VERIFICATION ON PAGE LOAD =====
  const token = sessionStorage.getItem("token");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (!token || isLoggedIn !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  // ===== FETCH NEXT EMP ID =====

  function fetchNextEmpId(callback) {
    empIdInput.value = "...."; // blank karo jab loading ho

    const params = new URLSearchParams({
      action: "nextEmpId",
      token: token, // token verify
    });

    fetch(scriptURL)
      .then((res) => res.json())
      .then((data) => {
        empIdInput.value = data.empId;
        if (callback) callback(data.empId); // callback call karo
      })
      .catch((err) => console.error("Error fetching next Emp ID:", err));
  }

  fetchNextEmpId();

  function calculateHourlyRate() {
    const dailyWage = parseFloat(dailyWageInput.value);
    const workHours = parseFloat(workHoursInput.value);

    if (dailyWage > 0 && workHours > 0) {
      hourlyRateInput.value = (dailyWage / workHours).toFixed(2);
    } else {
      hourlyRateInput.value = "";
    }
  }

  dailyWageInput.addEventListener("input", calculateHourlyRate);
  workHoursInput.addEventListener("input", calculateHourlyRate);

  function setError(id, message) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById("error-" + id);

    input.classList.add("input-error");
    if (errorDiv) errorDiv.textContent = message;
  }

  function clearError(id) {
    const input = document.getElementById(id);
    const errorDiv = document.getElementById("error-" + id);

    input.classList.remove("input-error");
    if (errorDiv) errorDiv.textContent = "";
  }

  function validateForm() {
    let valid = true;

    const requiredFields = [
      "labourName",
      "fatherName",
      "gender",
      "dob",
      "mobile",
      "address",
      "city",
      "state",
      "pincode",
      "labourType",
      "department",
      "dailyWage",
      "workHours",
      "joiningDate",
      "aadhaar",
      // "bankName",
      // "accountNumber",
      // "ifsc",
      // "accountHolder",
    ];

    requiredFields.forEach((id) => {
      clearError(id);
      const el = document.getElementById(id);

      if (!el.value.trim()) {
        setError(id, "This field is required");
        valid = false;
      }
    });

    return valid;
  }

  // ===== SAVE BUTTON =====
  saveBtn.addEventListener("click", () => {
    if (!validateForm()) return;
    loading.style.display = "flex";
    empIdInput.disabled = true; // empId field disable karo

    const token = sessionStorage.getItem("token");

    const formData = new URLSearchParams({
      action: "add",
      empId: empIdInput.value,
      labourName: document.getElementById("labourName").value.trim(),
      fatherName: document.getElementById("fatherName").value.trim(),
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      mobile: document.getElementById("mobile").value.trim(),
      altMobile: document.getElementById("altMobile").value.trim(),
      address: document.getElementById("address").value.trim(),
      city: document.getElementById("city").value.trim(),
      state: document.getElementById("state").value,
      pincode: document.getElementById("pincode").value.trim(),
      labourType: document.getElementById("labourType").value,
      department: document.getElementById("department").value.trim(),

      //   dailyWage: document.getElementById("dailyWage").value,
      //   workHours: document.getElementById("workHours").value,
      //   hourlyRate: document.getElementById("hourlyRate").value,

      dailyWage: dailyWageInput.value,
      workHours: workHoursInput.value,
      hourlyRate: hourlyRateInput.value,

      joiningDate: document.getElementById("joiningDate").value,
      contractor: document.getElementById("contractor").value.trim(),
      education: document.getElementById("education").value,
      primarySkill: document.getElementById("primarySkill").value.trim(),
      experience: document.getElementById("experience").value,
      aadhaar: document.getElementById("aadhaar").value.trim(),
      pan: document.getElementById("pan").value.trim(),

      pfApplicable: pfCheckbox.checked ? "YES" : "NO",
      pf: pfCheckbox.checked ? document.getElementById("pf").value.trim() : "",

      esicApplicable: esicCheckbox.checked ? "YES" : "NO",
      esic: esicCheckbox.checked
        ? document.getElementById("esic").value.trim()
        : "",

      bankName: document.getElementById("bankName").value.trim(),
      accountNumber: document.getElementById("accountNumber").value.trim(),
      ifsc: document.getElementById("ifsc").value.trim(),
      accountHolder: document.getElementById("accountHolder").value.trim(),
      token: token,
    });

    function clearAllInputs() {
      document.querySelectorAll("input, select, textarea").forEach((el) => {
        // Emp ID ko chhod do
        if (el.id === "empId") return;

        if (el.type === "checkbox" || el.type === "radio") {
          el.checked = false;
        } else if (el.tagName === "SELECT") {
          el.selectedIndex = 0;
        } else {
          el.value = "";
        }
      });
    }

    fetch(scriptURL, { method: "POST", body: formData })
      .then((res) => res.json())
      .then((result) => {
        // ===== SAVE COMPLETE, AB NAYA EMP ID FETCH KARO =====
        fetchNextEmpId((newEmpId) => {
          loading.style.display = "none";
          empIdInput.disabled = false; // empId enable karo
          alert(result.message + "\nEmp ID: " + newEmpId);
          clearAllInputs();
        });
      })
      .catch((err) => {
        console.error(err);
        loading.style.display = "none";
        empIdInput.disabled = false;
        alert("Error saving data!");
      });
  });
});
