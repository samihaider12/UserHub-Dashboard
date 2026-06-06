import type {
  UsersResponse,
  LoginRequest,
  LoginResponse,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./types";

const mockUsers = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg",
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://reqres.in/img/faces/8-image.jpg",
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
    avatar: "https://reqres.in/img/faces/9-image.jpg",
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
    avatar: "https://reqres.in/img/faces/10-image.jpg",
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
    avatar: "https://reqres.in/img/faces/11-image.jpg",
  },
  {
    id: 12,
    email: "carroll.neal@reqres.in",
    first_name: "Carroll",
    last_name: "Neal",
    avatar: "https://reqres.in/img/faces/12-image.jpg",
  },
  
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  await delay(300);

  if (
    data.email === "abc@gmail.com" &&
    data.password === "123"
  ) {
    return { token: "QpwL5tke4Pnpja7X4" };
  }

  throw new Error("Invalid email or password");
}

export async function fetchUsers(page: number): Promise<UsersResponse> {
  await delay(200);

  const perPage = 6;
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedUsers = mockUsers.slice(start, end);

  return {
    page,
    per_page: perPage,
    total: mockUsers.length,
    total_pages: Math.ceil(mockUsers.length / perPage),
    data: paginatedUsers,
  };
}

export async function createUser(
  data: CreateUserRequest
): Promise<CreateUserResponse> {
  await delay(300);

  const newId = Math.max(...mockUsers.map((u) => u.id)) + 1;
  const newUser = {
    id: newId,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    createdAt: new Date().toISOString(),
  };

  mockUsers.push({
    ...newUser,
    avatar: `https://i.pravatar.cc/150?img=${newId}`,
  });

  return newUser;
}

export async function updateUser(
  id: number,
  data: UpdateUserRequest
): Promise<UpdateUserResponse> {
  await delay(300);

  const user = mockUsers.find((u) => u.id === id);
  if (user) {
    user.first_name = data.first_name;
    user.last_name = data.last_name;
    user.email = data.email;
  }

  return {
    id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchUserById(id: number) {
  await delay(200);

  const user = mockUsers.find((u) => u.id === id);
  if (!user) throw new Error("User not found");
  return user;
}
