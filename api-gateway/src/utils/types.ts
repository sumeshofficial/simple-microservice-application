export const AUTH = {
  STRATEGY: "jwt",
  BEARER_PREFIX: "Bearer ",
} as const;

export const HEADERS = {
  USER_ID: "x-jwt-user-id",
  USER_ROLE: "x-jwt-user-role",
} as const;