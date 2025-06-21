# API‑Master

## Introduction

This project is a thoughtfully-crafted Angular application that showcases RESTful CRUD with pagination, in-memory caching via `HttpInterceptor`, and SCSS-powered custom styles. It serves as a learning template and foundation for building responsive and maintainable data-driven front-end apps.

---

## 🧭 Features

- **CRUD Operations** (Create, Read, Update, Delete) on posts via a REST API.
- **Paginated GET Requests** with `_page` and `_limit` query parameters.
- **Http Caching Interceptor** for optimizing pagination performance.
- **Reactive State Management** with `BehaviorSubject`.
- **Error Handling** via a centralized `ErrorHandlingService`.
- **SCSS Styling** and custom pagination components.
- **Optional Integration** with JSONPlaceholder or other REST API backends.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v14+)
- [Angular CLI](https://cli.angular.io/) (v12+)
- Internet access for connecting to REST API ( JSONPlaceholder api)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/hadijah10/API-Master.git
   cd API-Master

2. **Install dependencies**
   run npm install 

3. **Run the app**
   ng serve
   Visit http://localhost:4200 in your browser.

## 🛠️ Usage Guide
1. 📄 View and Page Through Posts
On load, the app fetches posts using pagination parameters.

2. Use ← and → buttons or page numbers to browse different pages.

3. ➕ Create a New Post
Add a new post using the form on the page.The newly created post appears at the top of the current list.

4. ✏️ Edit or Delete Posts
Edit inline or delete posts via corresponding UI controls.Edits and deletions are reflected immediately in the list.

## ⚡ Caching
Programmatic GET requests (e.g. page navigation) are cached for 5 minutes.

Changing pages within cache duration will reuse data without new API calls.

## 💡 Project Structure
API-Master/
├── README.md
├── angular.json
├── package.json
├── tsconfig.json
└── src/
    ├── app/
    │   ├── app.module.ts
    │   ├── app.component.ts
    │   ├── services/
    │   │   ├── api.service.ts
    │   │   └── auth.service.ts
    │   └── components/
    │       ├── navbar/
    │       │   ├── navbar.component.ts
    │       │   ├── navbar.component.html
    │       │   └── navbar.component.scss
    │       ├── home/
    │       │   ├── home.component.ts
    │       │   ├── home.component.html
    │       │   └── home.component.scss
    │       └── login/
    │           ├── login.component.ts
    │           ├── login.component.html
    │           └── login.component.scss
    ├── assets/
    └── environments/
        ├── environment.ts
        └── environment.prod.ts

        src/
    ├── app/
    │   ├── interceptors/
    │   │   └── authinterceptor.ts         # Add auth token to authorization header
    │   ├── services/
    │   │   ├── api.service.ts              # CRUD + pagination logic
    │   │   └── errorhandling.service.ts    # Centralized error handling
    |   |   |__ auth.service.ts             # Centralized authentication.
    |   |   |__ cacheservice.ts             # Managing of cache
    |   |   |__ components
    |   |   │   ├── posts/
    |   |   │   │   ├── posts.component.ts          # UI logic
    |   |   │   │   ├── posts.component.html        # Post list + pagination controls
    |   |   │   │   └── posts.component.scss        # SCSS styling
    |   |   │   ├── createpost/                     # Createpost html,scc and logic
    |   |   │   ├── editpost/                       # Editpost html,scc and logic
    |   |   │   ├── loader/                         # loader html,scc
    |   |   │   ├── navbar/                         # Navbar html,scc and logic
    |   |   │   ├── pagenotfound/                   # Pagenotfound html,scc
    |   |   │   ├── postlist/                       # Postlist html,scc and logic
    |   |   │   ├── singlepost/                     # Singlepost html,scc and logic
    |   |   |   |__ guards                          # 
    |   |   |   |   └──auth.guards.ts               #Guard to protect page until authentication
    |   |   │   ├── models/interfaces/
    |   |   │   │   └── datainterface.ts            # TypeScript interfaces
    |   |   │   │   └── cachemodel.ts               # TypeScript interfaces for cacheentry
    │   └── app.module.ts                   # Module & interceptor setup
    ...

   
### 🤝 Contributing
Contributions are welcome! Here's how to get started:

1. Fork the project

2. Create a feature branch: git checkout -b feature/YourFeature

3. Commit your changes: git commit -m "Add some feature"

4. Push to your branch: git push origin feature/YourFeature

5. Open a Pull Request

