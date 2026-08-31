# ✨ PersonalApp — All-in-One Personal Life OS & Career Dashboard

<div align="center">

  [![Angular](https://img.shields.io/badge/Angular-19+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
  [![.NET](https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon.tech-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
  [![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://personal-app-tan.vercel.app)
  [![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://personalapp-pd9o.onrender.com)

  <p align="center">
    <strong>A sleek, modern, full-stack Personal Life Operating System designed to seamlessly manage career opportunities, bank savings buckets, daily learning calendars, floating to-do checklists, and personal milestones in a unified Red & Violet Glassmorphism UI.</strong>
  </p>

  <p align="center">
    <a href="https://personal-app-tan.vercel.app">🌐 Live Frontend Demo</a>
    •
    <a href="https://personalapp-pd9o.onrender.com/swagger/index.html">📖 Swagger API Docs</a>
  </p>

</div>

---

## 🌟 Key Features & Modules

### 1. 🏠 Dashboard Overview
* **Personalized Greeting**: Dynamic welcome banner displaying user identity and real-time live date indicator (`📅 Mon, 31 Aug 2026`).
* **Live Statistics Cards**: Real-time aggregation of **Total Jobs**, **Total Wealth Saved**, **Bank Buckets Linked**, and **Pending Tasks**.
* **Quick Actions**: 1-click shortcuts to add job opportunities, log bank deposits, or manage daily routines.

### 2. 💼 Career & Job Opportunity Tracker (`/layout/jobs`)
* **Job Application Pipeline**: Track positions, companies, salary ranges, and work environments (Remote / Hybrid / On-site).
* **Application Status**: Manage lifecycle stages (`Applied`, `Interviewing`, `Offer Received`, `Rejected`).
* **Slide-over Application Drawer**: Smooth slide-over drawer to log new opportunities with quick notes and requirements.
* **Search & Filter**: Find applications by company name or role.

### 3. 💰 Savings & Wealth Hub (`/layout/savings`)
* **Level 1 — Bank & Reason Buckets**:
  * Visual bucket cards grouped by **Bank Name** and **Purpose** (e.g. *HDFC Bank - Emergency Fund*, *SBI - Bike Savings*, *Zerodha - Long Term Fund*).
  * Calculates accumulated balances and shows **Target Goal % Progress Bars**.
  * Auto-detecting bank badges with brand icons.
* **Level 2 — Monthly & Yearly Grouped History**:
  * Deposit and transaction history chronologically grouped under month headers (e.g., `August 2026`, `May 2025`) with monthly sub-totals.
  * **Interactive Month-Year Dropdown Filter**: Isolate and view transactions for any specific month with dynamic total calculation.
  * **⚡ Quick Deposit Shortcuts**: 1-click deposit logging (`+₹1,000`, `+₹5,000`, `+₹10,000`).
* **Slide-over Deposit Drawer**: Complete form for logging deposits, target amounts, and notes.

### 4. 📚 Daily Learning & Study Calendar Hub (`/layout/learning`)
* **Subject Hub**: Create learning topics like **C#**, **Angular**, **Docker**, **SQL**, and **System Design**.
* **Interactive 7-Day Monthly Calendar Grid**:
  * Full Sun–Sat month grid with `< Prev Month` and `Next Month >` navigation.
  * **Date Ticking**: Click any date (e.g., today) to log what you learned (e.g., *"OOPs concepts — Polymorphism"*).
  * Dates illuminate with a **glowing `✅` checkmark** badge and topic preview.
  * **🔥 Daily Study Streaks**: Tracks consecutive study days automatically.
* **Study History Timeline**: Chronological log of all recorded study notes and takeaways beneath the calendar.

### 5. ⚡ Global Floating Daily Checklist Widget (Accessible Everywhere)
* **Floating Trigger Button**: Stays accessible in the **bottom-right corner** on every single screen (Dashboard, Jobs, Savings, Learning, Profile).
* **Live Counter Badge**: Displays completed vs. total tasks (e.g., `3/5`).
* **Morning Quick-Add Bar**: Type tasks and press **`Enter`** to populate your morning checklist in seconds.
* **1-Click Ticking with Animation**: Toggling tasks triggers an instant strikethrough animation and live progress bar updates ($0\% \rightarrow 100\%$).
* **Celebration Banner**: Congratulates you when all daily tasks are completed (`🎉 All tasks completed today!`).

### 6. 👤 Profile & Identity (`/layout/profile`)
* **Glowing Avatar Badge**: Dynamically generated initials with ambient Red & Violet gradient glow.
* **Identity Details**: Displays verified email, account ID (`#USER-005`), and join date (`Member Since August 2026`).
* **Personal Life OS Summary**: Real-time snapshot of active career opportunities, total wealth saved, and bank buckets.
* **Secure Logout**: 1-click session invalidation and token cleanup.

### 7. 🔐 Authentication & Security (`/login`, `/userRegistration`)
* **Secure User Registration**: Duplicate email validation prevents database conflicts and provides instant feedback banners.
* **Interactive Password Toggles**: Show/hide password visibility eye toggle (`👁️ / 🙈`) for password and confirm-password fields.
* **SSR-Safe Route Guard (`authGuard`)**: Client hydration and platform-checked route protection preventing unauthorized access to internal modules.

---

## 🏗️ Architecture & Tech Stack

```
PersonalApp
├── 🌐 Presentation Layer (Angular 19+ / TypeScript / CSS3)
│   ├── Standalone Components, Reactive Signals & RxJS Services
│   ├── Responsive Mobile Topbar & Native Bottom Navigation Bar
│   ├── Global Floating Daily Checklist Widget
│   └── Red & Violet Gradient Theme with Glassmorphism
│
├── ⚙️ Service Layer (ASP.NET Core 10 Web API)
│   ├── RESTful Controllers with Swagger OpenAPI Documentation
│   ├── CORS Pipeline for Local & Cloud Origin Authorization
│   └── Dependency Injection & Scoped Repositories
│
└── 🗄️ Data Access Layer (Entity Framework Core)
    ├── Dual Database Support:
    │   ├── Cloud: PostgreSQL (Neon.tech Serverless)
    │   └── Local: Microsoft SQL Server
    └── Repository Pattern (UserRepository, JobRepository, SavingsRepository, LearningRepository)
```

### 💻 Technologies Used:

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | Angular 19+, TypeScript, HTML5, CSS3 | Standalone components, client hydration, responsive CSS |
| **Backend** | .NET 10 (ASP.NET Core Web API), C# | REST endpoints, middleware pipeline, CORS, Swagger UI |
| **ORM & Data** | Entity Framework Core, LINQ | Code-first & Database-first entity management |
| **Database** | PostgreSQL (Neon.tech) / SQL Server | Serverless cloud database and local SQL Server |
| **Hosting** | Vercel (Frontend) & Render (Backend) | CI/CD automated deployments with Docker containers |

---

## 📱 Mobile-First Responsive Design

PersonalApp includes a fully tailored mobile experience for viewports $\le 768\text{px}$:
* **Desktop**: Collapsible fixed sidebar with brand logo, today's date badge, and navigation links.
* **Mobile**: Automatically transforms into a **Floating Topbar** and a native **Bottom Navigation Bar** with full-width main content, responsive cards, and full-screen drawer sheets.

---

## 🚀 Getting Started (Local Development)

### Prerequisites:
* [.NET 10 SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (v20+ recommended)
* [Angular CLI](https://angular.dev/) (`npm install -g @angular/cli`)
* [SQL Server](https://www.microsoft.com/sql-server) or a free [Neon PostgreSQL](https://neon.tech) account

---

### 1. Clone the Repository
```bash
git clone https://github.com/Niju-2004/PersonalApp.git
cd PersonalApp
```

---

### 2. Backend Setup (.NET 10 Web API)

1. Open `PersonalApp.ServiceLayer/appsettings.json` and configure your database connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PersonalDashboardDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```
*(For Neon Cloud PostgreSQL, use: `Host=ep-tiny-queen-...neon.tech;Database=PersonalDashboardDB;Username=...;Password=...;SSL Mode=Require;Trust Server Certificate=true;`)*

2. Run the database table creation scripts located in:
   * [`PersonalApp.DataAccessLayer/SQL/SavingsTable.sql`](PersonalApp.DataAccessLayer/SQL/SavingsTable.sql)
   * [`PersonalApp.DataAccessLayer/SQL/LearningLogsTable.sql`](PersonalApp.DataAccessLayer/SQL/LearningLogsTable.sql)

3. Build and run the Web API:
```bash
cd PersonalApp.ServiceLayer
dotnet run
```
* Backend API will be available at: `https://localhost:7228`
* Swagger UI documentation: `https://localhost:7228/swagger/index.html`

---

### 3. Frontend Setup (Angular)

1. Navigate to the presentation directory and install dependencies:
```bash
cd PersonalApp.PresentationLayer
npm install
```

2. Start the Angular development server:
```bash
ng serve
```

3. Open your browser and navigate to:
```
http://localhost:4200
```

---

## 🌐 Cloud Deployment

* **Frontend (Vercel)**: Configured with [`vercel.json`](PersonalApp.PresentationLayer/vercel.json) pointing to `dist/PersonalApp.PresentationLayer/browser` with wildcard SPA routing.
* **Backend (Render)**: Containerized with multi-stage [`Dockerfile`](Dockerfile) running .NET 10 runtime on Linux with PostgreSQL connection.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by <strong>Niju M</strong></sub>
</div>
# PersonalApp