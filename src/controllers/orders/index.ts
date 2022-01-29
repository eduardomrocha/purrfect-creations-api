import { Response, Request } from "express";
import { MetricsData } from "../../types/metrics";
import { Metrics } from "../../utils/metrics";

const metrics = new Metrics();

const getMetrics = async (req: Request, res: Response): Promise<void> => {
  try {
    const result: MetricsData = await metrics.run(req.app.get("orders"));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export { getMetrics };
