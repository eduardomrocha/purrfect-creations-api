import { OrderData } from "./order";

export type MetricsData = {
  totalOrders: number;
  totalOrdersThisMonth: number;
  totalOrdersInProgress: number;
  revenue: number;
  recentOrders: OrderData[];
};
