import { DomainErrorStatusCodes } from "./DOMAIN_ERROR_STATUS_CODES";
import { DomainException } from "./DomainException";

export class OrderStateTransitionException extends DomainException {
  constructor(message: string) {
    super(message, DomainErrorStatusCodes.ORDER_STATE_INVALID_TRANSITION, 412);
    Object.setPrototypeOf(this, OrderStateTransitionException.prototype);
    this.name = "OrderStateTransitionEception";
  }
}
