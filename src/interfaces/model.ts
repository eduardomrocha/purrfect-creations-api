import { OrderData } from "../types/order";

export default interface IModel {
  count(): Promise<number>;
  countBy(filter: string): Promise<number>;
  revenue(): Promise<number>;
  lastOrders(): Promise<OrderData[]>;
}
