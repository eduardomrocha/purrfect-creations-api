import Airtable from "airtable";
import { OrderData } from "../types/order";

async function loadOrders(): Promise<OrderData[]> {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "app8wLQrrIMrnn673"
  );

  const data = await base("Orders")
    .select({
      view: "Grid view",
      sort: [{ field: "order_placed", direction: "desc" }],
    })
    .all();

  return data.map((order: any) => {
    return {
      id: order.fields.order_id,
      orderPlaced: new Date(order.fields.order_placed),
      productName: order.fields.product_name,
      price: order.fields.price,
      firstName: order.fields.first_name,
      lastName: order.fields.last_name,
      address: order.fields.address,
      email: order.fields.email,
      orderStatus: order.fields.order_status,
    };
  });
}

export { loadOrders };
