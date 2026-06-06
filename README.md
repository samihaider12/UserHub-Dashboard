# *User Management Dashboard*

A modern, responsive *User Management Dashboard* built with *Next.js 15 (App Router), TypeScript, Tailwind CSS, React Hook Form, TanStack Query, and Zustand*.

The application provides secure authentication, user management capabilities, analytics overview, responsive design, and a scalable architecture following modern frontend development practices.

---

# *Features*

## *Authentication*

* Secure login using ReqRes API
* Form validation using React Hook Form
* Protected routes via Next.js Middleware
* Authentication token persistence
* Automatic redirection for unauthenticated users
* Logout functionality

## *Dashboard Analytics*

* Total Users
* Active Users
* Inactive Users
* New Users (mocked business logic)

## *User Management*

* User listing with pagination
* Search by name and email
* Add User functionality
* Edit User functionality
* User Detail View
* Responsive table layout

## *User Experience*

* Skeleton loaders
* Toast notifications
* Error handling
* Empty states
* Modal animations
* Loading indicators
* Mobile-first responsive design

---

# *Tech Stack*

## *Framework*

* Next.js 15+ (App Router)

## *Language*

* TypeScript

## *Styling*

* Tailwind CSS

## *Form Management*

* React Hook Form

## *Data Fetching & Caching*

* TanStack Query (React Query)

## *Global State Management*

* Zustand

## *API Communication*

* Axios / Fetch API

## *Notifications*

* Toast Notification Library

---

# *Project Setup*

## *Prerequisites*

Ensure the following are installed:

* Node.js 18+
* npm or yarn

## *Installation*

Clone the repository:

bash
git clone <repository-url>


Navigate to the project directory:

bash
cd user-management-dashboard


Install dependencies:

bash
npm install


or

bash
yarn install


---

## *Run Development Server*

bash
npm run dev


Open:

text
http://localhost:3000


---

## *Build Production Version*

bash
npm run build


---

## *Run Production Build*

bash
npm start


---

# *Authentication Credentials*

The application uses the ReqRes mock authentication API.

json
{
  "email": "abc@gmail.com",
  "password": "123"
}


---

# *Project Structure*

text
src/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── users/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── dashboard-header.tsx
│   ├── providers.tsx
│   ├── user-detail-dialog.tsx
│   └── user-form-dialog.tsx
│
├── hooks/
│   └── use-toast.ts
│
├── lib/
│   ├── api.ts
│   ├── auth-store.ts
│   ├── types.ts
│   └── utils.ts
│
└── middleware.ts


---

# *Architectural Decisions*

## *App Router Architecture*

The application is built using Next.js App Router to leverage:

* Better routing conventions
* Improved layouts
* Server Component support
* Enhanced scalability

This approach aligns with modern Next.js development standards.

---

## *Separation of Concerns*

The application follows a modular architecture:

* UI Components are isolated
* API services are centralized
* Business logic is extracted into hooks
* State management remains independent

This improves maintainability and testability.

---

## *TanStack Query for Server State*

TanStack Query was chosen because it provides:

* Automatic caching
* Background refetching
* Query invalidation
* Loading and error states
* Optimized API requests

This significantly reduces manual state management complexity.

---

## *Zustand for Client State*

Zustand manages lightweight client-side state such as:

* Authentication state
* User session information
* UI-related state

It was selected due to its simplicity and minimal boilerplate.

---

## *Middleware-Based Route Protection*

Protected routes are secured through Next.js Middleware.

### *Benefits*

* Centralized access control
* Prevents unauthorized navigation
* Improves security and user experience

---

## *React Hook Form*

React Hook Form was used because it offers:

* Better performance
* Minimal re-renders
* Easy validation handling
* Cleaner form implementation

---

## *Reusable Modal Architecture*

The Add User, Edit User, and User Details features are implemented using reusable modal components.

### *Benefits*

* Reduced duplication
* Consistent user experience
* Easier maintenance

---

# *State Management Strategy*

## *TanStack Query*

Used for:

* Fetching users
* Caching API responses
* Pagination data
* Mutation handling
* Query invalidation after updates

---

## *Zustand*

Used for:

* Authentication state
* Token management
* Session persistence

This separation clearly distinguishes:

* *Server State → React Query*
* *Client State → Zustand*

---

# *API Endpoints Used*

## *Login*

http
POST https://reqres.in/api/login


## *Fetch Users*

http
GET https://reqres.in/api/users?page=1


## *Update User*

http
PUT https://reqres.in/api/users/{id}


---

# *Assumptions*

Several assumptions were made during implementation:

* ReqRes acts as a mock backend and does not persist newly created users permanently.
* Active and Inactive users are derived using mock business logic since the API does not provide status fields.
* New Users metric is calculated using mocked rules for demonstration purposes.
* Authentication token returned from ReqRes is treated as a valid session token.
* User creation updates the UI state locally due to API limitations.

---

# *Challenges Faced*

## *Working with Mock APIs*

*Challenge:*

ReqRes provides limited CRUD persistence.

*Solution:*

* Used optimistic UI updates.
* Maintained consistency through query invalidation and local cache updates.

---

## *Authentication Persistence*

*Challenge:*

Maintaining user authentication across refreshes.

*Solution:*

* Persisted authentication state securely.
* Validated protected routes through middleware.

---

## *Responsive Data Table*

*Challenge:*

Displaying large datasets effectively across desktop, tablet, and mobile devices.

*Solution:*

* Implemented responsive layouts.
* Used adaptive table rendering.

---

## *State Synchronization*

*Challenge:*

Keeping UI synchronized after add/edit operations.

*Solution:*

* Leveraged React Query mutation lifecycle.
* Used cache invalidation strategies.

---

# *Performance Considerations*

* Cached API responses using TanStack Query.
* Reduced unnecessary API requests.
* Component-level code organization.
* Optimized rendering using React Hook Form.
* Reusable UI components for consistency and maintainability.

---

# *Future Improvements*

* Role-based access control (RBAC)
* Real backend integration
* User deletion functionality
* Advanced filtering and sorting
* Dark mode support
* Unit and integration testing
* Audit logs and activity tracking

---

# *Conclusion*

This project demonstrates modern frontend engineering practices using *Next.js 15, TypeScript, TanStack Query, Zustand, and React Hook Form*.

The application emphasizes:

* Scalability
* Maintainability
* Responsive design
* Clean architecture
* Production-ready development practices