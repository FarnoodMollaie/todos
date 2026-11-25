export const endpoints = {
  loginEndpoint: "/auth/login",
  registerEndpoint: "/auth/register",
  refreshToken: "/auth/refresh",
  userProfileEndpoint: "/auth/me",
  //tasks
  getTasksList: "/todos",
  createTask: "/todos",
  updateTask: (id: string) => `/todos/${id}`,
};
