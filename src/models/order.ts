import Airtable from "airtable";
import { OrderData } from "../types/order";
import IModel from "../interfaces/model";

class OrderModel implements IModel {
  base: Airtable.Base;

  constructor() {
    this.base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      "app8wLQrrIMrnn673"
    );
  }

  public async lastOrders(): Promise<OrderData[]> {
    let orders: OrderData[] = [];

    const rawData = await this.base("Orders")
      .select({
        maxRecords: 10,
        sort: [{ field: "order_placed", direction: "desc" }],
      })
      .all();

    orders = rawData.map((order: any) => {
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

    return orders;
  }

  public async revenue(): Promise<number> {
    const data = await this.base("Orders")
      .select({
        filterByFormula: `order_status = 'shipped'`,
        fields: ["price"],
      })
      .all();

    return data.reduce((acc, curr) => {
      if (!curr.fields.price || typeof curr.fields.price !== "number") {
        return acc;
      }

      return acc + curr.fields.price;
    }, 0);
  }

  public async count(): Promise<number> {
    const data = await this.base("Orders").select().all();

    return data.length;
  }

  public async countBy(filter: string): Promise<number> {
    const data = await this.base("Orders")
      .select({
        filterByFormula: filter,
      })
      .all();

    return data.length;
  }
}

export default OrderModel;
