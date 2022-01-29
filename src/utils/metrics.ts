import { MetricsData } from "../types/metrics";
import { OrderData } from "../types/order";

export class Metrics {
  constructor() {}

  public totalOrders(orders: OrderData[]): number {
    return orders.length;
  }

  public totalOrdersByStatus(orders: OrderData[], status: string): number {
    return orders.filter((order) => order.orderStatus === status).length;
  }

  public totalOrdersThisMonth(orders: OrderData[]): number {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const ordersThisMonth = orders.filter(
      (order) =>
        order.orderPlaced.getMonth() === thisMonth &&
        order.orderPlaced.getFullYear() === thisYear
    );
    return ordersThisMonth.length;
  }

  public revenue(orders: OrderData[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.price;
    }, 0);
  }

  public lastOrders(orders: OrderData[], quatity: number): OrderData[] {
    return orders.slice(0, quatity);
  }

  public async run(orders: OrderData[]): Promise<MetricsData> {
    const metrics: MetricsData = {
      totalOrders: this.totalOrders(orders),
      totalOrdersThisMonth: this.totalOrdersThisMonth(orders),
      totalOrdersInProgress: this.totalOrdersByStatus(orders, "in_progress"),
      revenue: this.revenue(orders),
      recentOrders: this.lastOrders(orders, 5),
    };

    return metrics;
  }
}
