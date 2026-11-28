export const endpoints = {
  loginEndpoint: "/auth/login",
  registerEndpoint: "/auth/register",
  refreshToken: "/auth/refresh",
  userProfileEndpoint: "/auth/me",
  logoutEndpoint: "/auth/logout",
  //tasks
  getTasksList: "/todos",
  createTask: "/todos",
  updateTask: (id: string) => `/todos/${id}`,
};
