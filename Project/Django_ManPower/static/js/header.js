class AppHeader extends HTMLElement {
  connectedCallback() {
    /* ---------- CSS (inject once) ---------- */
    if (!document.getElementById("sap-header-style")) {
      const style = document.createElement("style");
      style.id = "sap-header-style";
      style.textContent = `
        *{margin:0;padding:0;box-sizing:border-box;}
        :root{
          --sap-shell-bg:#2C3E50;
          --sap-text:#fff;
          --sap-border-light:#D4DDE6;
          --sap-hover:#E8F0F8;
          --sap-selected:#0A6ED1;
          --sap-text-dark:#1A1A1A;
        }
        body{
          background:#F5F6F7;
          font-family:"Segoe UI",Arial,sans-serif;
          padding-top:100px;
        }

        .sap-logo{font-size:18px;font-weight:700;}
        .sap-user-menu{
          display:flex;
          align-items:center;
          gap:14px;
          font-size:14px;
        }
        .sap-icon{
          width:26px;height:26px;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          border-radius:4px;
        }
        .sap-icon:hover{
          background:rgba(255,255,255,0.15);
        }

        .logout-btn{
          padding:4px 10px;
          font-size:13px;
          border:1px solid #fff;
          background:transparent;
          color:#fff;
          border-radius:4px;
          cursor:pointer;
        }
        .logout-btn:hover{
          background:#E74C3C;
          border-color:#E74C3C;
        }

        .nav-btn{
          flex:1;
          text-decoration:none;
          color:var(--sap-text-dark);
          font-size:14px;
          border-right:1px solid var(--sap-border-light);
          display:flex;
          align-items:center;
          justify-content:center;
          gap:6px;
        }
        .nav-btn:last-child{border-right:none;}
        .nav-btn:hover{background:var(--sap-hover);}
        .nav-btn.active{
          background:var(--sap-selected);
          color:#fff;
        }

        .sap-shell{
          width:100%;
          background:var(--sap-shell-bg);
          color:var(--sap-text);
          padding:10px 20px;
          display:flex;
          justify-content:space-between;
          align-items:center;
          position:fixed;
          top:0;
          left:0;
          z-index:1000;
        }

        .nav-toolbar{
          width:100%;
          height:40px;
          background:#fff;
          border-bottom:1px solid var(--sap-border-light);
          display:flex;
          position:fixed;
          top:46px;
          left:0;
          z-index:999;
        }
      `;
      document.head.appendChild(style);
    }

    /* ---------- AUTH CHECK ---------- */
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "index.html";
      return;
    }

    const username = sessionStorage.getItem("username") || "User";

    /* ---------- HTML ---------- */
    this.innerHTML = `
      <div class="sap-shell">
        <div class="sap-logo">APS</div>

        <div class="sap-user-menu">
          <span>${username}</span>
          <div class="sap-icon">⚙</div>
          <div class="sap-icon">?</div>
          <button class="logout-btn" id="logoutBtn">➜]</button>
        </div>
      </div>

      <div class="nav-toolbar">
        <a href="/home" class="nav-btn" id="nav-home">🏠 Home</a>
        <a href="/addEmp" class="nav-btn" id="nav-add">👷 Add Employee</a>
        <a href="/viewEmp" class="nav-btn" id="nav-view">📋 View All</a>
        <a href="/salary" class="nav-btn" id="nav-salary">💰 Salary</a>
        <a href="/reports" class="nav-btn" id="nav-reports">📊 Reports</a>
      </div>
    `;

    /* ---------- LOGOUT ---------- */
    this.querySelector("#logoutBtn").addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        sessionStorage.clear();
        window.location.href = "index.html";
      }
    });

    /* ---------- ACTIVE PAGE ---------- */
    const page = location.pathname.split("/").pop();
    const map = {
      "home.html": "nav-home",
      "add-employee.html": "nav-add",
      "view-employee.html": "nav-view",
      "salary.html": "nav-salary",
      "reports.html": "nav-reports",
    };

    if (map[page]) {
      const btn = this.querySelector("#" + map[page]);
      if (btn) btn.classList.add("active");
    }
  }
}

customElements.define("app-header", AppHeader);
