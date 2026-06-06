User Management Dashboard

A modern, responsive User Management Dashboard built with Next.js 15 (App Router), TypeScript, Tailwind CSS, React Hook Form, TanStack Query, and Zustand.

The application provides secure authentication, user management capabilities, analytics overview, responsive design, and a scalable architecture following modern frontend development practices.

---

Features

Authentication

- Secure login using ReqRes API
- Form validation using React Hook Form
- Protected routes via Next.js Middleware
- Authentication token persistence
- Automatic redirection for unauthenticated users
- Logout functionality

Dashboard Analytics

- Total Users
- Active Users
- Inactive Users
- New Users (mocked business logic)

User Management

- User listing with pagination
- Search by name and email
- Add User functionality
- Edit User functionality
- User Detail View
- Responsive table layout

User Experience

- Skeleton loaders
- Toast notifications
- Error handling
- Empty states
- Modal animations
- Loading indicators
- Mobile-first responsive design

---

Tech Stack

Framework

- Next.js 15+ (App Router)

Language

- TypeScript

Styling

- Tailwind CSS

Form Management

- React Hook Form

Data Fetching & Caching

- TanStack Query (React Query)

Global State Management

- Zustand

API Communication

- Axios / Fetch API

Notifications

- Toast Notification Library

---

Project Setup

Prerequisites

Ensure the following are installed:

- Node.js 18+
- npm or yarn

Installation

Clone the repository:

git clone <repository-url>

Navigate to project directory:

cd user-management-dashboard

Install dependencies:

npm install

or

yarn install

Run Development Server

npm run dev

Open:

http://localhost:3000

Build Production Version

npm run build

Run Production Build

npm start

---

Authentication Credentials

The application uses the ReqRes mock authentication API.

{
  "email": "abc@gmail.com",
  "password": "123"
}

---

Project Structure

src/
│
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── users/
│   ├── modals/
│   ├── ui/
│   └── shared/
│
├── services/
│   ├── api.ts
│   └── user.service.ts
│
├── hooks/
│   ├── useUsers.ts
│   └── useAuth.ts
│
├── store/
│   └── authStore.ts
│
├── types/
│
├── utils/
│
├── middleware.ts
│
└── providers/

---

Architectural Decisions

1. App Router Architecture

The application is built using Next.js App Router to leverage:

- Better routing conventions
- Improved layouts
- Server Component support
- Enhanced scalability

This approach aligns with modern Next.js development standards.

---

2. Separation of Concerns

The application follows a modular architecture:

- UI Components are isolated
- API services are centralized
- Business logic is extracted into hooks
- State management remains independent

This improves maintainability and testability.

---

3. TanStack Query for Server State

TanStack Query was chosen because it provides:

- Automatic caching
- Background refetching
- Query invalidation
- Loading and error states
- Optimized API requests

This significantly reduces manual state management complexity.

---

4. Zustand for Client State

Zustand manages lightweight client-side state such as:

- Authentication state
- User session information
- UI-related state

It was selected due to its simplicity and minimal boilerplate compared to larger state management solutions.

---

5. Middleware-Based Route Protection

Protected routes are secured through Next.js Middleware.

Benefits:

- Centralized access control
- Prevents unauthorized navigation
- Improves security and user experience

---

6. React Hook Form

React Hook Form was used because it offers:

- Better performance
- Minimal re-renders
- Easy validation handling
- Cleaner form implementation

---

7. Reusable Modal Architecture

The Add User, Edit User, and User Details features are implemented using reusable modal components.

Benefits:

- Reduced duplication
- Consistent user experience
- Easier maintenance

---

State Management Strategy

TanStack Query

Used for:

- Fetching users
- Caching API responses
- Pagination data
- Mutation handling
- Query invalidation after updates

Zustand

Used for:

- Authentication state
- Token management
- Session persistence

This separation clearly distinguishes:

- Server State → React Query
- Client State → Zustand

---

API Endpoints Used

Login

POST https://reqres.in/api/login

Fetch Users

GET https://reqres.in/api/users?page=1

Update User

PUT https://reqres.in/api/users/{id}

---

Assumptions

Several assumptions were made during implementation:

1. ReqRes acts as a mock backend and does not persist newly created users permanently.
2. Active and Inactive users are derived using mock business logic since the API does not provide status fields.
3. New Users metric is calculated using mocked rules for demonstration purposes.
4. Authentication token returned from ReqRes is treated as a valid session token.
5. User creation updates the UI state locally due to API limitations.

---

Challenges Faced

1. Working with Mock APIs

ReqRes provides limited CRUD persistence.

Solution:

- Used optimistic UI updates.
- Maintained consistency through query invalidation and local cache updates.

---

2. Authentication Persistence

Challenge:

- Maintaining user authentication across refreshes.

Solution:

- Persisted authentication state securely and validated protected routes through middleware.

---

3. Responsive Data Table

Challenge:

- Displaying large datasets effectively across desktop, tablet, and mobile devices.

Solution:

- Implemented responsive layouts and adaptive table rendering.

---

4. State Synchronization

Challenge:

- Keeping UI synchronized after add/edit operations.

Solution:

- Leveraged React Query mutation lifecycle and cache invalidation strategies.

---

Performance Considerations

- Cached API responses using TanStack Query.
- Reduced unnecessary API requests.
- Component-level code organization.
- Optimized rendering using React Hook Form.
- Reusable UI components for consistency and maintainability.

---

Future Improvements

- Role-based access control (RBAC)
- Real backend integration
- User deletion functionality
- Advanced filtering and sorting
- Dark mode support
- Unit and integration testing
- Audit logs and activity tracking

---

Conclusion

This project demonstrates modern frontend engineering practices using Next.js 15, TypeScript, TanStack Query, Zustand, and React Hook Form. The application emphasizes scalability, maintainability, responsive design, clean architecture, and a production-ready development approach
