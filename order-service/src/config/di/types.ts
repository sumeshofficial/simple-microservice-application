export const TYPES = {
  // infra
  OrderRepository: Symbol.for("OrderRepository"),
  UIDService: Symbol.for("UIDService"),

  // usecases
  CreateOrder: Symbol.for("CreateOrder"),
  GetOrderById: Symbol.for("GetOrderById"),
  GetOrdersByUserId: Symbol.for("GetOrderByUserId"),
  UpdateOrderStatus: Symbol.for("UpdateOrderStatus"),

  // controllers
  OrderController: Symbol.for("OrderController"),

  //middlewares
  AttactUserContextMiddleware: Symbol.for("AttactUserContext"),
  ValidationMiddleware: Symbol.for("ValidationMiddleware"),

  // routes
  OrderRoutes: Symbol.for("OrderRoutes"),

  // gRPC client
  UserServiceClient: Symbol.for("UserServiceClient"),
};