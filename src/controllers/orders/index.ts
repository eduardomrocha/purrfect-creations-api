import { Response, Request } from "express";
import { MetricsData } from "../../types/metrics";
import { Metrics } from "../../utils/metrics";
import OrderModel from "../../models/order";

const metrics = new Metrics(new OrderModel());

const getMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: MetricsData = await metrics.run();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export { getMetrics };
