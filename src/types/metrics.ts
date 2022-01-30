import { OrderData } from "./order";

export type MetricsData = {
  totalOrders: number;
  totalOrdersThisMonth: number;
  totalOrdersInProgress: number;
  revenue: number;
  expectedRevenue: number;
  recentOrders: OrderData[];
};
