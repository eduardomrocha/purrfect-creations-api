import { Router } from "express";
import { getMetrics } from "../controllers/orders";

const routes: Router = Router();

routes.get("/dashboard-metrics", getMetrics);

export default routes;
