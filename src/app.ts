import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { loadOrders } from "./services/orders";

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(routes);

loadOrders().then((orders) => {
  app.set("orders", orders);
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
