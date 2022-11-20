import { ORDER_STATUS } from '../enums/order-status.enum';

export class CreateOrderDto {
  description: string;
  noOfBlock: number;
  alphaId: string;
  status: ORDER_STATUS.DUE;
  data?: any;
}
