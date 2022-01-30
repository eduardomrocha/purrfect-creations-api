import "jest";
import { Metrics } from "../../src/utils/metrics";
import { OrderData } from "../../src/types/order";

describe("Metrics", () => {
  let orders: OrderData[];

  beforeEach(() => {
    orders = [
      {
        id: 1,
        orderPlaced: new Date("2022-01-25"),
        productName: "product 1",
        price: 100.0,
        firstName: "John",
        lastName: "Doe",
        address: "123 Main St",
        email: "jonhdoe@mail.com",
        orderStatus: "in_progress",
      },
      {
        id: 2,
        orderPlaced: new Date("2022-01-25"),
        productName: "product 2",
        price: 50.0,
        firstName: "Jane",
        lastName: "Doe",
        address: "123 Main St",
        email: "janedoe@mail.com",
        orderStatus: "shipped",
      },
    ];
  });

  it("should be able to create a new instance", () => {
    const metrics = new Metrics();
    expect(metrics).toBeDefined();
  });

  it("should return the total number of orders", () => {
    const metrics = new Metrics();
    const result = metrics.totalOrders(orders);
    expect(result).toBe(2);
  });

  it("should return the total number of orders in progress", () => {
    const metrics = new Metrics();
    const result = metrics.totalOrdersByStatus(orders, "in_progress");
    expect(result).toBe(1);
  });

  it("should return the total number of orders this month", () => {
    const metrics = new Metrics();
    const result = metrics.totalOrdersThisMonth(orders);
    expect(result).toBe(2);
  });

  it("should return the revenue", () => {
    const metrics = new Metrics();
    const result = metrics.revenue(orders);
    expect(result).toBe(50.0);
  });

  it("should return the total number of orders", () => {
    const metrics = new Metrics();
    const result = metrics.lastOrders(orders, 1);
    expect(result).toStrictEqual(orders.slice(0, 1));
  });

  it("should return all metrics", async () => {
    const metrics = new Metrics();
    const result = await metrics.run(orders);
    expect(result).toStrictEqual({
      totalOrders: 2,
      totalOrdersInProgress: 1,
      totalOrdersThisMonth: 2,
      revenue: 50.0,
      recentOrders: [
        {
          id: 1,
          orderPlaced: new Date("2022-01-25"),
          productName: "product 1",
          price: 100.0,
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          email: "jonhdoe@mail.com",
          orderStatus: "in_progress",
        },
        {
          id: 2,
          orderPlaced: new Date("2022-01-25"),
          productName: "product 2",
          price: 50.0,
          firstName: "Jane",
          lastName: "Doe",
          address: "123 Main St",
          email: "janedoe@mail.com",
          orderStatus: "shipped",
        },
      ],
    });
  });
});
