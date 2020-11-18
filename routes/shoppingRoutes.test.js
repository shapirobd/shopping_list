process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

const item1 = { name: "Bread", price: 3.99 };
const item2 = { name: "Eggs", price: 1.99 };
const item3 = { name: "Ketchup", price: 4.99 };
const item4 = { price: 4.49 };
const item5 = { name: "Relish" };

const updatedItem2 = { name: "EggWhites", price: 6.49 };

beforeEach(() => {
	items.push(item1);
	items.push(item2);
});

afterEach(() => {
	items.length = 0;
});

describe("GET /items", () => {
	test("Get all items", async () => {
		const res = await request(app).get("/items");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([item1, item2]);
	});
});

describe("POST /items", () => {
	test("Successful item creation", async () => {
		const res = await request(app).post("/items").send(item3);
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ added: item3 });
	});
	test("Request missing 'name'", async () => {
		const res = await request(app).post("/items").send(item4);
		expect(res.statusCode).toBe(400);
	});
	test("Request missing 'price'", async () => {
		const res = await request(app).post("/items").send(item5);
		expect(res.statusCode).toBe(400);
	});
	test("Request missing 'name' and 'price'", async () => {
		const res = await request(app).post("/items").send({});
		expect(res.statusCode).toBe(400);
	});
});
describe("GET /items/:name", () => {
	test("Successfully retrieve item", async () => {
		const res = await request(app).get("/items/Bread");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual(item1);
	});
	test("Item name not found", async () => {
		const res = await request(app).get("/items/Muffins");
		expect(res.statusCode).toBe(404);
	});
});

describe("PATCH /items/:name", () => {
	test("Successfully update item", async () => {
		const res = await request(app).patch("/items/Eggs").send(updatedItem2);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ updated: updatedItem2 });
	});
	test("Item name not found", async () => {
		const res = await request(app).patch("/items/Steak").send(updatedItem2);
		expect(res.statusCode).toBe(404);
	});
	test("Request missing 'name'", async () => {
		const res = await request(app).patch("/items/Bread").send(item4);
		expect(res.statusCode).toBe(400);
	});
	test("Request missing 'price'", async () => {
		const res = await request(app).patch("/items/Bread").send(item5);
		expect(res.statusCode).toBe(400);
	});
	test("Request missing 'name' and 'price'", async () => {
		const res = await request(app).patch("/items/Bread").send({});
		expect(res.statusCode).toBe(400);
	});
});

describe("DELETE /items/:name", () => {
	test("Successfully delete item", async () => {
		expect(items.length).toBe(2);
		const res = await request(app).delete("/items/Bread");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ message: "Deleted" });
		expect(items.length).toBe(1);
	});
	test("Item name not found", async () => {
		expect(items.length).toBe(2);
		const res = await request(app).delete("/items/Steak");
		expect(res.statusCode).toBe(404);
		expect(items.length).toBe(2);
	});
});
