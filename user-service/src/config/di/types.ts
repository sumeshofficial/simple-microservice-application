export const TYPES = {
  // infra
  UserRepository: Symbol.for("UserRepository"),
  PasswordService: Symbol.for("PasswordService"),
  TokenService: Symbol.for("TokenService"),
  UIDService: Symbol.for("UIDService"),
  UserMapper: Symbol.for("UserMapper"),

  // usecases
  RegisterUser: Symbol.for("RegisterUser"),
  LoginUser: Symbol.for("LoginUser"),
  GetUser: Symbol.for("GetUser"),

  // controllers
  AuthController: Symbol.for("AuthController"),
  UserController: Symbol.for("UserController"),

  //middlewares
  AttactUserContextMiddleware: Symbol.for("AttactUserContext"),
  RoleMiddleware: Symbol.for("RoleMiddleware"),
  ValidationMiddleware: Symbol.for("ValidationMiddleware"),

  // routes
  AuthRoutes: Symbol.for("AuthRoutes"),
  UserRoutes: Symbol.for("UserRoutes"),

  // gRPC controllers
  UserGrpcController: Symbol.for("UserGrpcController"),
};