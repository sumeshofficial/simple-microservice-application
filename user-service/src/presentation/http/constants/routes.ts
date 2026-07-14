export const API = {
  PREFIX: "/api",
  VERSION: "/v1",
} as const;

export const ROUTES = {
  AUTH: `${API.PREFIX}${API.VERSION}/auth`,
  USERS: `${API.PREFIX}${API.VERSION}/users`,
} as const;