import { MetricsData } from "../types/metrics";
import IModel from "../interfaces/model";

export class Metrics {
  constructor(public model: IModel) {}

  public async run(): Promise<MetricsData> {
    const totalOrders = await this.model.countBy(``);
    const totalOrdersInProgress = await this.model.countBy(
      `order_status = 'in_progress'`
    );
    const totalOrdersThisMonth = await this.model.countBy(
      `MONTH(order_placed) = ${new Date().getMonth()}`
    );
    const revenue = await this.model.revenue();
    const lastOrders = await this.model.lastOrders();

    const metrics: MetricsData = {
      totalOrders,
      totalOrdersThisMonth,
      totalOrdersInProgress,
      revenue,
      recentOrders: lastOrders,
    };

    return metrics;
  }
}
